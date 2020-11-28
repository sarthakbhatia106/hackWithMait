const puppeteer = require('puppeteer');

async function scraper(search){

    const extractMed= async(url)=>{
      const page = await browser.newPage();
        
      await page.goto(url,{waitUntil:"networkidle2"});
        
      let medicine= await page.evaluate(()=>{

        let json={};
        json.name= document.querySelector('div.drug_c div.info').innerText.trim();
        json.price= document.querySelector('div.pricebox span.final-price').innerText.trim();

        json.link="https://www.netmeds.com/".concat(document.querySelector('div.drug_c a'))

        return json;
      })
    return medicine;
    }


    const browser = await puppeteer.launch();
    let list= search.split(" ");
    let url;
    if(list.length==1){
      url='https://www.netmeds.com/catalogsearch/result?q='.concat(search);
    }
    else{
      url='https://www.netmeds.com/catalogsearch/result?q='.concat(list[0]).concat("+").concat(list[1]);
    }

  let finalData=await extractMed(url);
  // console.log(finalData);
  await browser.close();
  return finalData;
}

module.exports=scraper;