import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`${process.env.DB_URL}`, {
  logging: false,
  native: false,
});

const connectToDB = async () => {
  await sequelize.sync({ force: true });
  return console.log("Connected to DB");
};

export { connectToDB };
