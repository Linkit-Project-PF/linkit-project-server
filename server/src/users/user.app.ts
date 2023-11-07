import "dotenv/config";
import express from "express";
import cors from "cors";
import base from "./infrastructure/db/airtable"; //* Decomment if testing airtable.

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT != null || 3000;

//! EXAMPLE TO GET USERNAME from all users on table.

// GET ALL EXAMPLE

// base("Users")
//   .select({
//     view: "Grid view",
//   })
//   .eachPage(function page(records, next) {
//     records.forEach((record) => console.log(record.get("Username")));
//   });

// CREATE EXAMPLE

// base("Users").create(
//   [
//     {
//       fields: {
//         Username: "CreatedFromCode",
//         Password: "a12345",
//         Email: "testing@gmail.com",
//         Role: "admin",
//       },
//     },
//   ],
//   function (err, records) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     records?.forEach((record) => {
//       console.log(record.getId());
//     });
//   }
// );

// GET ONE EXAMPLE

// base("Users")
//   .select({
//     view: "Grid view",
//     filterByFormula: "IF({Username} = 'CreatedFromCode', TRUE(), FALSE())",
//   })
//   .eachPage((records, next) =>
//     records.forEach((rec) => console.log(rec.fields))
//   );

//--------------------------

app.listen(port, () => {
  console.log(`Listen in port: ${port}`);
});
