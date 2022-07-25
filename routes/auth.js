import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await req.models.User.findOne({ where: { email } });

  const match = user && (await bcrypt.compare(password, user.password));

  if (!match) {
    return res.status(400).json({ message: "email or password incorrect" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  res.status(200).json({ token });
});

router.post("/sign-up", async (req, res) => {
  const { email, passwordA, passwordB } = req.body;

  if (passwordA !== passwordB) {
    return res.status(400).json({ message: "passwords do not match" });
  }

  const password = await bcrypt.hash(passwordA, 10);

  const user = await req.models.User.create({ email, password });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  res.status(200).json({ token });
});

export default router;
