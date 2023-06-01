import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
const port = 4000;

app.use(cors())

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//testing 
app.get("/", (req:Request, res:Response) => {
  res.send("Working Successfully!");
});

export default app;
