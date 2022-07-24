import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined") {
    res.status(400).json({ message: "missing token" });
  }

  try {
    const token = bearerHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.id;

    next();
  } catch (error) {
    res.status(400).json({ message: "malformed token" });
  }
};
