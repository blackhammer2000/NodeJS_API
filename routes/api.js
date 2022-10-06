import { Router as router } from "express";

router.get("/", (_req, res) => {
  res.json({
    message: "hi",
  });
});

export default router;
