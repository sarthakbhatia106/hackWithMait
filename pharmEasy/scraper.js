const puppeteer = require('puppeteer');

async function scraper(search){

    const extractMed= async(url)=>{
      const page = await browser.newPage();
        
      await page.goto(url,{waitUntil:"networkidle2"});
        
      let medicine= await page.evaluate(()=>{

        let json={};
        json.name= document.querySelector('h1.ooufh').innerText.trim();
        json.price= document.querySelector('div._1_yM9').innerText.trim();

        json.link="https://pharmeasy.in".concat(document.querySelector('a._3o0NT._1NxW8'))

        return json;
      })
    return medicine;
    }


    const browser = await puppeteer.launch();
    let list= search.split(" ");
    let url;
    if(list.length==1){
      url='https://pharmeasy.in/search/all?name='.concat(search);
    }
    else if(list.length==2){
      url='https://pharmeasy.in/search/all?name='.concat(list[0]).concat('+').concat(list[1]);
    }else{
      url='https://pharmeasy.in/search/all?name='.concat(list[0]).concat('+').concat(list[1]).concat('+').concat(list[2]);
    }

  let finalData=await extractMed(url);
  console.log(finalData);
  await browser.close();
  return finalData;
}

module.exports=scraper;