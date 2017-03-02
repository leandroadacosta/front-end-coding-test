import http from "http";
import fs from "fs";

module.exports = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(fs.readFileSync("../api/index.json", "utf8"));
  });
});
