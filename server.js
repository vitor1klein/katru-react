const express = require("express");
const { resolve } = require("path");
const helmet = require("helmet");
const app = express();

// Configure the Content-Security-Policy header using the helmet-csp middleware
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: [
        "'self'",
        "'favicon.ico'",
        "https://portal-katru-backend-stg-45b34fb09c5c.herokuapp.com",
      ],
      scriptSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css",
        "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
      ],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://portal-katru-backend-stg-45b34fb09c5c.herokuapp.com"],
      fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      frameAncestors: ["'self'", "https://portal-katru-stg-63b4d6c06427.herokuapp.com"],
    },
  })
);

app.use("/", express.static(resolve(__dirname, "./build")));

// Add a catch-all route to serve index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is running");
});
