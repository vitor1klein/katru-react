const express = require("express");
const { resolve } = require("path");
const helmet = require("helmet");
const app = express();

// const cspPolicy =
//   "default-src 'self'; style-src 'unsafe-inline' 'self' https://fonts.googleapis.com https://unpkg.com/leaflet@1.7.1/dist/leaflet.css 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='; img-src 'self' data:; child-src 'none'; font-src 'unsafe-inline' 'self' https://fonts.googleapis.com https://fonts.gstatic.com/; connect-src 'self' https://portal-katru-backend-stg-45b34fb09c5c.herokuapp.com";

// // Middleware to set the CSP header for all routes
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", cspPolicy);
//   next();
// });

// Configure the Content-Security-Policy header using the helmet-csp middleware
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'", "'favicon.ico'"],
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

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is running");
});
