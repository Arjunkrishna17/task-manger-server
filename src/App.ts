import express from "express";
import cors from "cors";
import StartDb from "./Utils/StartDb";

const app = express();

StartDb()

app.listen(8080, () => {
  console.log("listening");
});
