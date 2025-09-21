import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import Router from "./Routes/Route.js";
import { connnectDB } from "./ConnectDB/DBconfig.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

connnectDB();

// middleware
app.use(express.json()).use("/api/v1/products", Router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));
  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`server has started on http://localhost:${PORT}`);
});
