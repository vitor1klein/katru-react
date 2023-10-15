const express = require("express");
const { resolve } = require("path");
const app = express();

const cspPolicy =
  "default-src 'self'; style-src 'unsafe-inline' 'self' https://fonts.googleapis.com https://unpkg.com/leaflet@1.7.1/dist/leaflet.css 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='; img-src 'self' data:; child-src 'none'; font-src 'unsafe-inline' 'self' https://fonts.googleapis.com https://fonts.gstatic.com/; connect-src 'self' https://portal-katru-backend-stg-45b34fb09c5c.herokuapp.com";

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
