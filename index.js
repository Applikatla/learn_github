import express from "express";
import bodyparser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

app.use(bodyparser.urlencoded({extended: true}));

var user = false;
function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "xyz") {
        user = true;
    }
    next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/check", (req, res) => {
    console.log(req.body);
    if (user) {
        res.sendFile(__dirname + "/xyz.html");
    }
    else {
        res.redirect("https://www.google.com")
    }
})

app.listen(port, () => {
    console.log("Server running on port " + port);
})

