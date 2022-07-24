import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
import models, { sequelize } from "./models/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.models = models;
  next();
});

// Routes
app.use("/auth", routes.auth);
app.use("/job", routes.job);
app.use("/resume", routes.resume);

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
