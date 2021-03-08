const http = require("http");
const parse = require("querystring");
const fs = require("fs");

let username;
let Password;
  //CREATING OUR SERVER AND READING OURFILES....
http.createServer(function (request, response) {
    if (request.url === "/" && request.method === "GET") {
      response.setHeader("Content-Type", "text/html");
      fs.readFile("informations/5.html", "utf8", (err, page) => {
        if (err) console.log(err.message);

        response.write(page);
        response.end();
      });
    } 
    
    else if (request.url === "/5.css" && request.method === "GET") {
      fs.readFile("informations/5.css", "utf8", (err, page) => {
        if (err) console.log(err.message);

        response.write(page);
        response.end();
      });
    } 
    
    else if (request.url === "/Tanha.woff" && request.method === "GET") {
      // response.setHeader('Content-Type', 'text/html');
      fs.readFile("informations/Tanha.woff", "", (err, page) => {
        if (err) console.log(err.message);

        response.write(page);
        response.end();
      });
    } 
    
    else if (request.url === "/image.jpg" && request.method === "GET") {
      // response.setHeader('Content-Type', 'text/html');
      fs.readFile("informations/image.jpg", "", (err, page) => {
        if (err) console.log(err.message);

        response.write(page);
        response.end();
      });
    } 
    
    else if (request.url === "/post.js" && request.method === "GET") {
      // response.setHeader('Content-Type', 'text/html');
      fs.readFile("informations/post.js", "utf8", (err, page) => {
        if (err) console.log(err.message);

        response.write(page);
        response.end();
      });
    } 
    
    
    //PARSING OUR DATAS WHEN IT IS POSTED AND WE GET IT...
    else if (request.method === "POST" && request.url === "/") {
      console.log(request);
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });

      request.on("end", () => {
        username = parse.parse(body).username;
        Password = parse.parse(body).password;
        

        fs.readFile("informations/infos.json", "utf8", (err, data) => {
          if (err) console.log(err.message);
          let listOfJson = JSON.parse(data);

          //CHECKING IF PASSWORD AND USERNAME IS COORECT OR NOT...
          let targetUser = listOfJson.find((el) => el.userName === username);

          if (!targetUser || targetUser.password !== Password) {
            response.writeHead(400, "NOT FOUND...!");

            response.end();
          } else {
            response.end("ورود موفقیت امیز بود.");
          }
        });
      });
    }
  })  .listen(5007);
console.log("server started on port 5007...");
