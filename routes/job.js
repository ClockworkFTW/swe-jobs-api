import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const jobs = await req.models.Job.findAll();
  return res.status(200).json(jobs);
});

export default router;
