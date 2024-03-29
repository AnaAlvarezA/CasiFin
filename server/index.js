const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes - urls
app.use(require("./routes/users"));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
