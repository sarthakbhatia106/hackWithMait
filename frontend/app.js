const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home");
});

// app.get("/compare", (req, res) => {
//     res.render("compare");
// });

app.post("/compare", (req, res) => {
    console.log(req.body.medicine);
    let medicineName = req.body.medicine;

    const medicines = [
        {
            website: "PharmEasy",
            name: "Crocin",
            price: 50.0,
        },

        {
            website: "1mg",
            name: "Crocin",
            price: 52.3,
        },
        {
            website: "Netmed",
            name: "Crocin",
            price: 51.5,
        },
    ];

    res.render("compare", { medicines: medicines });
});

app.listen(3000, () => {
    console.log("Server has started!!!");
});
