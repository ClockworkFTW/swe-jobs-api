import Sequelize from "sequelize";

import getUserModel from "./user.js";
import getJobModel from "./job.js";
import getResumeModel from "./resume.js";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectOptions: process.env.NODE_ENV === "production" && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: process.env.DATABASE_CA_CERT,
      },
    },
    logging: false,
  }
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Job: getJobModel(sequelize, Sequelize),
  Resume: getResumeModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
