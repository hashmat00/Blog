var express = require("express");
var app  = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//MONGOOSE/MODEL CONFIG
var blogSchemda = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchemda);



//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR !");
        }else{
            res.render("index", {blogs: blogs});
        }
    });
    
});

//NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new.ejs");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, blog){
        if(err){
            res.render("new");
        }else{
            //redirect to index
            res.redirect("/blogs");
        }
    });
});
  


//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, blog){
      if(err){
          res.redirect("/");
      } else {
          res.render("show", {blog: blog});
      }
   });
});




//START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server has started");
});