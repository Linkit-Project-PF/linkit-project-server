import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port: number | string = process.env.PORT || 3001;

app.listen(port, () => console.log(`Ready on port ${port}`));
