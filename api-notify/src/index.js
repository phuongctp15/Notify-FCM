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

const serverKey =
  "AAAAjax9CfE:APA91bHb-yZQmgyM1AiTR95RA_o_8kuete3H3mfV2-fGShbm6XIk8z-FM0HPiC6xQKgBJ19dyMazvzuJUzq42o8IT7qx6KUfHjpR_ZoWwMixS7E8Mgc4vzbKSW592gBpaXu7A9SQWzIe";

app.post("/send-noti", async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const message = {
      token:
        "er8jDxh22SkNADIwOHxf_V:APA91bHSLtq3oHCG3w5XZlPYYtTFQ21QYzf-3GqcGhNsuEtkDgM--Si3a3n5IZ-A4f4-tBqVXRF9Zbo1wU1DzltkmpoE9UGglc0fgRBE0S9O3vm_GUgVzkpQh8BEUp5h2_u-w38I-z0F",
      notification: {
        title,
        body,
        image:
          "https://i.pinimg.com/736x/26/cf/9d/26cf9dc7582a48a3c627c0b8ab40774f.jpg",
      },
    };

    const response = await getMessaging().send(message);
    console.log("Successfully sent message:", response);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, function () {
  console.log(`port run on localhost:5000`);
});
