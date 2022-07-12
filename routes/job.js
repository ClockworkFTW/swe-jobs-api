import { Router } from "express";

const router = Router();

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

router.get("/", async (req, res) => {
  let jobs = await req.models.Job.findAll();

  jobs = jobs.map((job) => {
    const match = randBetween(1, 99);
    const min = randBetween(8, 12) * 10000;
    const max = randBetween(14, 22) * 10000;
    return { ...job.get(), match, salary: { min, max } };
  });

  return res.status(200).json({ jobs });
});

export default router;
