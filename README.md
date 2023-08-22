# web-crawler-bot
This project is about building a web crawler CLI using node js. It accepts an input URL and a depth number. The crawler will scan through images in the given URL and stores their links in a json file. The loop is iterated for the depth value provided. Crawler also scans for hyperlinks in the url and continue to every links inside that page.

Results should be saved into a results.json file in the following format:

1{ 2 "results": [ 3 { 4 "imageUrl": "string", 5 "sourceUrl": "string // the page url this image was found on", 6 "depth": "number // the depth of the source at which this image was found on" 7 } 8 ] 9}


Installation:

Run 'npm install' to install all every dependencies. Run the crawler.js like below syntax. Provide custom URL and depth.

node crawler.js https://dataloop.ai/blog/ 2
