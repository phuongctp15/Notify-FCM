import express, { json } from "express";
import serviceAccountJson from "../serviceAccountJson.json" assert { type: "json" };
import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  projectId: "medipro-datn",
});

app.post("/send-noti", async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const message = {
      tokens: [
        "er8jDxh22SkNADIwOHxf_V:APA91bF7IeP7JFGVhARRgtV_1TtOmrtPujsRvlcqSnHskxl_LQDFWMSrydq09t-mfsp01edP2RjfGVt3KHjKTaec4UoGKgltzuTRF96oifszX59j7cLaduhh5LVDIYux8iJX5FBT93UT",
        "e69JIjZ34KgHVUSMM-g315:APA91bHBg3HrXLL5ixnDKh2zH8HYJq29Dl_6Qk9pGWDxHwYjK3DfgaQ4qjIK8xLeFsuPaZ5Z6bGhFljblb-nXIWE7MIJyux5caMU2pAblRJCc86y_cqVOJk5tpIQ1YmausisG4gb6Nw1",
      ],
      notification: {
        title,
        body,
      },
      webpush: {
        fcm_options: {
          link: "https://fb.com",
        },
      },
      data: {
        link: "https://fb.com",
        icon: "https://static.vecteezy.com/system/resources/previews/000/420/825/original/vector-doctor-icon.jpg",
      },
    };

    const response = await getMessaging().sendMulticast(message);
    console.log("Successfully sent message:", response);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, function () {
  console.log(`Port 5000 running...`);
});
