import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/bankRoutes";

const app = express();
const port = 8080;

mongoose.Promise = global.Promise;
// Connect URL
const url = "mongodb://localhost:27017/BankDatabase";

// Connect to MongoDB
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      return console.log(err);
    }

    // const db = client.db('BankDatabase');
    // console.log(mongoose.connection.getClient().db("BankDabatase").find({}));

    console.log(`MongoDB/mongoose Connected: ${url}`);
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// set the default values for cross-origin resource :-
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
app.use(cors());
routes(app);

app.get("/", (req, res) => {
  res.send(`Bank application is running on port: ${port}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
