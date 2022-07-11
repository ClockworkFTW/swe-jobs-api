import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
import models, { sequelize } from "./models/index.js";

const app = express();

app.use(cors());

app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use("/job", routes.job);

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
