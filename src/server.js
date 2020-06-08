const express = require("express");

const server = express();

server.use(express.static("public"));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", { express: server, noCache: true });

server.get("/", (require, response) => {
  return response.render("index.html");
});

server.get("/create-point", (require, response) => {
  return response.render("create-point.html");
});

server.get("/search-results", (require, response) => {
  return response.render("search-results.html");
});

server.listen(3000);
