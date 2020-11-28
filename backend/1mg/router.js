const scraper=require("./scraper");
const router= require("express")();

router.get('/data/:medicine', async (req, res) => {
    try {
     const med =await scraper(req.params.medicine);
     res.json(med);
    } catch (err) {
     res.json({ error: err.message || err.toString() });
    }
   });

module.exports=router;