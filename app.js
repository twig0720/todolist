//jshint eversion:6
var items = ["buy","food","cook"];

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US",options);

  res.render("lists", {
    kindOfDay: day,
    newListItems: items
  });



});

app.post("/",function(req,res){
  var item = req.body.newItem;
  items.push(item);

  res.redirect("/");

});


app.listen(3000, function() {
  console.log("server 3000");
});
