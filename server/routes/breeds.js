const express = require("express");
const router = express.Router();
const fs = require("fs");

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
const breeds = [
  {
    id: 1,
    name: "Bambino",
  },
  { id: 2, name: "siba" },
];

router.get("/search", function (req, res, next) {
    const q = req.query.q;
    if(!q){
        res.status(400).json("no search keyword provided");
    }
    let breeds = []
    fs.readFile("breeds.json","utf-8",async (err,data)=>{
        if(!err){
          let array = JSON.parse(data);
          if(array.length>0){
            breeds = array;
          }
        }
        else{
            const response = await fetch("https://api.thecatapi.com/v1/breeds");
            const data = await response.json();
            breeds = data.map(item=>({id:item.id,name:item.name}));
        }
        res.status(200).json(breeds.filter(item=>item.name.toLocaleLowerCase().includes(q)))
    })

});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  if(!id){
    res.status(400).json("no id provided");
  }
  let breed = {};

  //get array from json file first
  fs.readFile("breeds.json","utf-8",async (err,data)=>{
    if(!err){
      let array = JSON.parse(data);
      if(array.length>0){
        breed = array.filter(item=>item.id===id)[0];
      }
    }
    else{
        //if the json file doesn't have data, then fetch the api again.
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        const data = await response.json();
        breed = data.filter(item=>item.id===id)[0];
    }
    res.status(200).json(breed);
  })
});


module.exports = router;
