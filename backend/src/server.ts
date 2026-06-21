const express = require("express");
const cors = require("cors");
const router = express.Router();

const mainRouter = require("./router/mainRouter");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
router.use("/api/v1",mainRouter);
app.use(router);

app.get("/",({req,res}: {req:any, res: any}):void=>{
    res.send("Server is Running ")
});

app.listen(3000,()=>{
    console.log("server is runnning on port 3000");
})
