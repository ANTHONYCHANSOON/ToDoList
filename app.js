const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

var whatDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var weekDayEnd = "";
var items = ["buy food", "cook food", "eat food"];
var workItems = [];

app.get("/", function (req, res) {
    // res.send("hello");
    let today = new Date();

    if (today.getDay() === 6 || today.getDay() === 0) {
        //res.send("Saturday/Sunday " + whatDay[today.getDay()]);
        //res.render("list", { kindOfDay: whatDay[today.getDay()] })
        weekDayEnd = "weekend";
    } else {
        //res.send("M-F " + whatDay[today.getDay()]);
        //res.render("list", { kindOfDay: whatDay[today.getDay()] })
        weekDayEnd = "weekday";
    }

    // res.render("list",
    //     {
    //         kindOfDay: weekDayEnd,
    //         dayDay: whatDay[today.getDay()]
    //     }
    // )


    //tolocalestring

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var myday = today.toLocaleDateString("en-US", options);

    res.render("list",
        {
            kindOfDay: weekDayEnd,
            dayDay: whatDay[today.getDay()],
            completeDay: myday,
            newListItem: items
        })
})

app.post("/", function (req, res) {
    console.log(req.body);
    item = req.body.newItem

    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/")
    }
})

app.get("/work", function (req, res) {
    
    res.render("list",
        {
            completeDay: "Work Checklist",
            newListItem: workItems
        }
    )
})

// app.post("/work", function(req,res) {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })

app.listen(process.env.PORT || 3000, function () {
    console.log(`port is ${process.env.PORT || 3000}`);
})
