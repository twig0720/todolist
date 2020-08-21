//jshint eversion:6
var items = ["buy","food","cook"];
var workItems = [];

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
    listTitle: day,
    newListItems: items
  });

});

app.get("/work",function(req,res){
  res.render("lists", {
    listTitle: "Work List",
    newListItems: workItems
  });
})


app.post("/",function(req,res){
  let item = req.body.newItem;
  if(req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  };


});

// app.post("/work",function(req,res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

// approach #1
// app.post('/:index', function(req, res) {
//   const index = req.params.index;
//   items.splice(index, 1);
//
//   res.redirect('/');
// })
// approach #2

app.post('/delete', function(req, res) {
  const index = req.body.index;
  items.splice(index, 1);
  res.redirect('/');
})


app.listen(3000, function() {
  console.log("server 3000");
});
