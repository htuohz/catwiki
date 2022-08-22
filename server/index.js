const path = require("path");
const express = require("express");
const fs = require("fs");
require("dotenv").config();
const breedsRouter = require("./routes/breeds");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));



// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from CatWiki!" });
// });

app.get("/", (req,res) => {
  fs.readFile("breeds.json","utf-8",(err,data)=>{
    if(!err){
      let breeds = JSON.parse(data);
      if(breeds.length>0){
        res.status(200).json(breeds.map(item=>({id:item.id, name:item.name})));
      }
    }
    fetch("https://api.thecatapi.com/v1/breeds")
    .then(response=>response.json())
    .then(data=>{
      res.status(200).json(data.map(item=>({id:item.id, name:item.name})));
      fs.writeFile("breeds.json",JSON.stringify(data),(err)=>{
        console.error(err)
      });
    })
    .catch(err=>console.error(err))
  })
})
app.use("/breeds", breedsRouter);



// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT);
  console.log(PORT);
}

module.exports = app;
