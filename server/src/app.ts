import express from "express";
import bodyParser from "body-parser";
import { searchRouter } from "./search";

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/search", searchRouter);

app.get("/", function (req, res) {
  res.send("Example backend");
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
