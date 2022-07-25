import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import routes from "./routes/index.js";
import models, { sequelize } from "./models/index.js";

const app = express();

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

// Logging
if (ENV === "developement") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());
app.use(cors());

// Add database models to request
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
  app.listen(PORT, () =>
    console.log(`Server running in ${ENV} mode on port ${PORT}`)
  );
});
