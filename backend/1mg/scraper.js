const puppeteer = require('puppeteer');

async function scraper(search){

    const extractMed= async(url)=>{
        const page = await browser.newPage();
        
        await page.goto(url,{waitUntil:"networkidle2"});
        
    let medicine= await page.evaluate(()=>{

        let box=document.querySelector('div.row.style__grid-container___3OfcL div div:nth-child(1)')

        let json={};

        let nameA=box.querySelector('div > a > div.style__product-description___1vPQe > span');
        let nameB=box.querySelector('div > a > div.style__product-description___zY35s > div.style__pro-title___3G3rr')
        json.name= nameA==null? nameB.innerText.concat(box.querySelector('div > a > div.style__product-description___zY35s > div.style__pack-size___3jScl').innerText) : nameA.innerText.concat(box.querySelector('div > a > div.style__product-description___1vPQe > div').innerText);

        
        let priceA=box.querySelector('div > a > div.style__product-pricing___1OxnE > div > div.style__price-tag___KzOkY');
        let priceB=box.querySelector('div > a > div.style__product-pricing___1tj_E > div')
        json.price= priceA==null? priceB.innerText: priceA.innerText;

        json.link="https://www.1mg.com".concat(box.querySelector('div > a').getAttribute('href'));

        return json;
    })
    return medicine;
    }


    const browser = await puppeteer.launch();
    let list= search.split(" ");
    let url;
    if(list.length==1){
        url='https://www.1mg.com/search/all?name='.concat(search);
    }else{
        url ='https://www.1mg.com/search/all?name='.concat(list[0]).concat("%20").concat(list[1]);
    }

  let data=await extractMed(url)
  await browser.close();
    return data;

}
scraper("mont lcz");

module.exports=scraper;
