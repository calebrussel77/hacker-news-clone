const next = require("next");
const http = require("http");
const url = require("url");
const path = require("path");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, resp) => {
      // Parse request url to get its pathName
      const parsedUrl = url.parse(req.url, true);
      const { pathname } = parsedUrl;

      // if a service worker requested, serve it as static file
      if (pathname === "/service-worker.js") {
        const filePath = path.join(__dirname, ".next", pathname);
        app.serveStatic(req, resp, filePath);
      } else {
        // otherwise let next take care of that
        handle(req, resp, parsedUrl);
      }
    })
    .listen(port, () => {
      console.log(`Listening on PORT ${port}`);
    });
});
