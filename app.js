const express = require("express");
const bodyParser = require("body-parser");

const app = express();
bodyParser.urlencoded({ extended: true });
app.set('view engine', 'ejs');

var whatDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

app.get("/", function (req, res) {
    // res.send("hello");
    let today = new Date();

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.send("Saturday/Sunday " + whatDay[today.getDay()])
    } else {
        res.send("M-F " + whatDay[today.getDay()])
    }
})

app.listen(process.env.PORT || 3000, function () {
    console.log(`port is ${process.env.PORT || 3000}`);
})
