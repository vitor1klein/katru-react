const express = require("express");
const { resolve } = require("path");
const app = express();

// Define your CSP policy as a string
const cspPolicy =
  "default-src 'self'; style-src 'self' https://fonts.googleapis.com https://unpkg.com/leaflet@1.7.1/dist/leaflet.css; img-src 'self'; child-src 'none'; font-src 'self' https://fonts.googleapis.com";

// Middleware to set the CSP header for all routes
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", cspPolicy);
  next();
});

app.use("/", express.static(resolve(__dirname, "./build")));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is running");
});
