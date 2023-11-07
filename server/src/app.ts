import "dotenv/config";
import express from "express";
import cors from "cors";
import user_route from "./users/infrastructure/routes/user.routes";
// import base from "./users/infrastructure/db/airtable"; //* Decomment if testing airtable.

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT != null || 3000;

//! EXAMPLE TO GET USERNAME from all users on table.

app.use(user_route);

app.listen(port, () => {
  console.log(`Listen in port: ${port}`);
});
