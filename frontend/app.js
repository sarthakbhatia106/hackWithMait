const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

const oneMg=require("../backend/1mg/scraper");
const netMeds=require("../backend/netMeds/scraper");
const PharmEasy=require("../backend/pharmEasy/scraper");


    app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("home");
});

// app.get("/compare", (req, res) => {
//     res.render("compare");
// });

app.post("/compare", async (req, res) => {
    console.log(req.body.medicine);
    let medicineName = req.body.medicine;

    const oneMgdata=await oneMg(medicineName);
    const netMedsData=await netMeds(medicineName);
    const pharmEasyData=await PharmEasy(medicineName);

    const medicines = [
        {
            website: "PharmEasy",
            name: pharmEasyData.pharmEasyname,
            price: pharmEasyData.pharmEasyprice,
        },

        {
            website: "1mg",
            name: oneMgdata.oneMgname,
            price: oneMgdata.oneMgprice,
        },
        {
            website: "Netmeds",
            name: netMedsData.netMedsname,
            price: netMedsData.netMedsprice,
        },
    ];

    res.render("compare", { medicines: medicines });
});

app.listen(3000, () => {
    console.log("Server has started!!!");
});
