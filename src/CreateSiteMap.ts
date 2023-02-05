import glob from "glob"
import getDirName from "./getDirName";
import { url } from "./config";
import fs from "fs"

const __dirname = getDirName(import.meta.url);

function iterateAllPages(){
    const pagesPath = "./src/frontend/pages/**/*.tsx"
    const pagefiles = glob.sync(pagesPath);
    const pages= []

    for (const pageFile of pagefiles){
        const urlPath = (pageFile.match(/(?<=frontend\/pages)([\/\w])*/g)[0].toLowerCase());
        pages.push(urlPath);
    }

    return pages;
}

export default function createSiteMap(path : string = "./frontend/pages/**/*.tsx"){
    console.log("Building SiteMap...");
    let xml = 
    `<?xml version="1.0" encoding="UTF-8"?>\n\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `\t{{URLS HERE}}\n` +
    `</urlset>\n`

    let xmlPageUrls = "";

    const pages = iterateAllPages();

    for (const page of pages){
        console.log("PAGE DISCOVERED : ", page);
        let pageUrl = 
        `\t<url>\n` +
        `\t\t<loc>${url}${page}</loc>\n` +
        `\t\t<changefreq>weekly</changefreq>\n` +
        `\t</url>\n`
    
        xmlPageUrls += pageUrl;
    }  
  
    xml = xml.replace("\t{{URLS HERE}}\n", xmlPageUrls);
  
    return {
      xml : xml,
      save : (path : string) => {
        fs.writeFileSync(path, xml);
      }
    };
}