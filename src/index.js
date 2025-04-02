const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const routes = require("./routers");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());  // ❗ QUAN TRỌNG: Middleware để đọc JSON từ request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')))
const db = require("./config/database");
db.connect();

routes(app);

app.get("/", (req, res) => {
    res.send("Hello World!");
    });
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });