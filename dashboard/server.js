const path = require("path");
const express = require("express");
const app = require("./public/App.js");
const fetch = require('node-fetch');

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.all("/api/*", async (req, res) => {
  console.log("/api/ path:", req.params[0]);

  try{
    const response = await fetch('https://analysis.ccbluex.net/api/' + req.params[0], {
      method: req.method,
      body: req.body
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

server.get("*", function(req, res) {
  const { html } = app.render({ url: req.url });

  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <!DOCTYPE html>
    <link rel='stylesheet' href='/global.css'>
    <link rel='stylesheet' href='/bundle.css'>
    <link rel="icon" type="image/x-icon" href="/img/favicon.ico">
    <title>API Analytics</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div id="app">${html}</div>
    <script src="/bundle.js"></script>
  `);

  res.end();
});

const port = 80;
server.listen(port, () => console.log(`Listening on ${port}`));
