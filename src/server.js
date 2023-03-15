import http from "http";
import fs from "fs/promises";
// import { PORT } from "./Common/config";
const PORT = 8080;

const startServer = async function () {
  try {
    const htmlPage = await fs.readFile("public/index.html");

    const server = await http.createServer((_, response) => {
      response.writeHeader(200, { "Content-Type": "javascript" });
      response.write(htmlPage);
      response.end();
    });

    server.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
