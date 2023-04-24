import http from "http";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { PORT } from "./Common/config.js";
import { chatgptService } from "./Chatgpt/chatgpt.service.js";

dotenv.config();

const server = http.createServer(async (req, res) => {
  if (req.url === "/chat" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", async () => {
      const parsedData = JSON.parse(data);
      const response = await chatgptService.makeRequest(parsedData.prompt);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(response));
      res.end();
    });

    return;
  }

  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./public/index.html";
  } else {
    filePath = path.join(process.cwd(), filePath);
  }
  const extname = path.extname(filePath);

  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        res.writeHead(404);
        res.end("404 File Not Found");
      } else {
        res.writeHead(500);
        res.end("500 Internal Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
