import { Router } from "express";
import stringSimilarity from "string-similarity";
import { randBetween } from "../util/index.js";

const router = Router();

router.get("/", async (req, res) => {
  // Get jobs from database
  let jobs = await req.models.Job.findAll();

  // Add random match % and salary range (placeholder)
  jobs = jobs.map((job) => {
    const match = randBetween(1, 99);
    const min = randBetween(8, 12) * 10000;
    const max = randBetween(14, 22) * 10000;
    return { ...job.get(), match, salary: { min, max } };
  });

  // Send jobs as JSON
  res.status(200).json({ jobs });
});

router.get("/search", async (req, res) => {
  // Get query parameters
  const { title, company, location } = req.query;

  // Get jobs from database
  let jobs = await req.models.Job.findAll();

  // Filter jobs by query parameters
  jobs = jobs.filter((job) => {
    const titleMatch = title
      ? job.title.toLowerCase().includes(title.toLowerCase())
      : true;

    const companyMatch = company
      ? stringSimilarity.compareTwoStrings(company, job.company) > 0.3
      : true;

    const locationMatch = location
      ? stringSimilarity.compareTwoStrings(location, job.location) > 0.3
      : true;

    return titleMatch && companyMatch && locationMatch;
  });

  // Send jobs as JSON
  res.status(200).json({ jobs });
});

export default router;
