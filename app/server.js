import express from "express";
import { resolve, join } from "path";
import { json } from "body-parser";
import * as fs from "fs";
import * as rateLimit from "express-rate-limit";

const app = express();

const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins window
  max: 100, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after sometime"
});
app.use(Limiter);
app.use("/assets", express.static(resolve(__dirname, "public")));

const path = resolve(__dirname, "views");
const f = join(path, "index.html");

app.get("/", (req, res) => {
  fs.readFile(
    f,
    {
      encoding: "UTF-8"
    },
    (err, data) => {
      res.send(data);
    }
  );
});

app.get("/api/download", (req, res) => {
  const path = join(__dirname, "files");
  const stream = fs.createReadStream(`${path}/sajankumar_v.pdf`);
  stream.on("finish", () => {
    res.end();
  });
  stream.pipe(res);
});

app.use(json());
app.post("/api/send-message", (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: "Sent" });
});

app.listen(3000, () => {
  console.log("Server is running!!");
});
