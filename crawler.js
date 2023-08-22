const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const isUrlHttp = require('is-url-http')

const app = express()
const url2 = "https://dataloop.ai/blog/"
var url = ''
var depth

var links_list = []

//to get command line args
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if(index == 2)
        url = val.toString();
    else if(index == 3)
        depth = val;
         
 } );
console.log('depth:', depth)


const crawl_pages = (url, depth) => {
    console.log("Crawling at depth:",depth)

    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            var link_list = []
            var page_http_links = []
            var img_crawl_link=''
            // Finding the image URLs
            $('a',html).each(function(){
                var imgLink = $(this).find('img').attr('src')
                var httplinks = $(this).attr('href')
               
         
            if(imgLink != undefined){              
                link_list = {
                    imageUrl: imgLink,
                    sourceUrl: url,
                    depth: depth
            }}
            links_list.push(link_list)

            if(httplinks != undefined && isUrlHttp(httplinks)){ // Checking if the link is a valid http url
                //console.log("hyperlink:", httplinks)
                page_http_links.push(httplinks)
            }                            
          
            })
           
            //Calling file write operation
            writeResult(links_list)

           //Find hyperlinks in the page
            img_crawl_link = page_http_links[0]
            console.log("img crawl link:",img_crawl_link)
            
            //looping the function to crawl into inner pages
            if(depth != 0)
                crawl_pages(img_crawl_link,depth-1)
            

    }).catch(err => console.log(err))
}
// Function to write the iimage URLs into results.json file
var writeResult = (hyper_links) => {

fs.readFile('results.json', function(err, data) {
    if (data.length == 0) { // Checking if file is empty
        console.log('file is empty');
        fs.writeFile("results.json", JSON.stringify(hyper_links), err => {
     
            // Checking for errors
            if (err) throw err;            
            console.log("empty file written."); // Success
        });
        }
    else {
        //appending data into non-empty file
        var jsonData = JSON.parse(data)
        jsonData.push(hyper_links)
        
       fs.writeFile("results.json", JSON.stringify(jsonData), err => {
     
            // Checking for errors
            if (err) throw err;            
            console.log("URLs appended."); // Success
        });
    }
    }

)}
crawl_pages(url,depth) 

//app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
