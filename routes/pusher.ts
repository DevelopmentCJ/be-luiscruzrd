import { Router } from "express";
import Pusher from "pusher";
const router = Router();

const pusher = new Pusher({
  appId: "1467359",
  key: "abb975a801390f0852f4",
  secret: "d62ea1ff1a8ba730f9db",
  cluster: "us2",
  useTLS: true,
});

router.post("/messages", async (req, res) => {
  await pusher.trigger("my-channel", "my-event", {
    username: req.body.username,
    message: req.body.message,
  });

  res.json([]);
});

export default router;
