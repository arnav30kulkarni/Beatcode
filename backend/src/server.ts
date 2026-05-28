const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",({req,res}: {req:any, res: any}):void=>{
    res.send("Server is Running ")
});

app.listen(3000,()=>{
    console.log("server is runnning on port 3000");
})
