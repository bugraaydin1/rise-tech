const http = require("http");

const hostname = "localhost" || "127.0.0.1";
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  res.writeHead(200, headers);

  if (req.url === "/priorities" && req.method === "GET") {
    const priorities = ["Urgent", "Regular", "Trivial"];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(priorities));
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "404 not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`🚀 Server started on http://${hostname}:${port}`);
});
