import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connect.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.static("public"));
const database_url =
  process.env.mongo_url ||
  "mongodb+srv://captain-marvel:L8K6IMUzDlQZw4pC@mern-project-1.qyj0fdm.mongodb.net/Bus-M`";
const PORT = process.env.PORT || 3000;

 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.set("view engine", "ejs");
app.use(express.static("views"));

connectDB(database_url);

app.use(routes);

app.get("/", (req, res) => {
  res.status(201).send("<h1>Hello</h1>");
});

app.listen(PORT, () =>
  console.log(`server started on port http://localhost:${PORT}`)
);

 
