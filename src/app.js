const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//Get path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Set handlebar and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("", {
    title: "Weather",
    name: "Rishabh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rishabh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    name: "Rishabh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send('<p style="color:red">Please enter address!</p>');
  }
  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send(`<p style="color:red">${err}</p>`);
    } else {
      forecast(data.latitude, data.longitude, (err, forecastData) => {
        if (err) {
          return res.send(`<p style="color:red">${err}</p>`);
        } else {
          return res.send({
            address: req.query.address,
            place: data.location,
            forecast: forecastData,
          });
        }
      });
    }
  });

});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error!",
    error: "Page not found",
    name: "Rishabh",
  });
});

app.listen(3000, () => {
  console.log("Server up on port 3000");
});
