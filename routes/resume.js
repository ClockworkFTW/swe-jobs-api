import { Router } from "express";
import multer from "multer";
import PDFParser from "pdf2json";

import { validateToken } from "../middleware/index.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", validateToken, async (req, res) => {
  const { models, userId } = req;

  const resumes = await models.Resume.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ resumes });
});

router.post("/", [validateToken, upload.single("resume")], async (req, res) => {
  const { models, userId, file } = req;

  const pdfParser = new PDFParser(this, 1);
  pdfParser.parseBuffer(file.buffer);

  pdfParser.on("pdfParser_dataError", (errData) => {
    return res.status(400).json({ message: errData.parserError });
  });

  pdfParser.on("pdfParser_dataReady", async (pdfData) => {
    let resumes = await models.Resume.findAll({ where: { userId } });
    const isActive = resumes.length === 0;

    const text = pdfParser.getRawTextContent();
    await models.Resume.create({ text, isActive, userId });

    resumes = await models.Resume.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ resumes });
  });
});

router.get("/:id", validateToken, async (req, res) => {
  const { params, models, userId } = req;
  const { id } = params;

  await models.Resume.update(
    { isActive: false },
    { where: { isActive: true } }
  );
  await models.Resume.update({ isActive: true }, { where: { id } });

  const resumes = await models.Resume.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ resumes });
});

router.delete("/:id", validateToken, async (req, res) => {
  const { params, models, userId } = req;
  const { id } = params;

  const nextResume = await models.Resume.findOne({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  await models.Resume.update(
    { isActive: true },
    { where: { id: nextResume.id } }
  );
  await models.Resume.destroy({ where: { id } });

  const resumes = await models.Resume.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ resumes });
});

export default router;
