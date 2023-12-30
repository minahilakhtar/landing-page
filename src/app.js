const express = require("express");
const app = express();
const path = require("path")
const port = process.env.PORT || 8000;
require("./db/conn")
const User = require("./models/usermsg")
const hbs = require("hbs")

//settinf the path
app.use(express.urlencoded({extended:false}))
const staticPath = path.join(__dirname, "../public")
const templatePath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialPath)
// console.log(path.join(__dirname, "../public"))

//middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath)

//routing
//app.get(path, callback)

app.get("/", (req, res)=>{
    // res.send("hello from home")
    res.render("index")
})
app.get("/contact", (req, res)=>{
    // res.send("hello from home")
    res.render("contact")
})

app.post("/contact", async(req, res)=>{
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index")
    } catch (error) {
        res.status(501).send(error)
    }
})
app.listen(port, (req, res)=>{
    console.log(`listing on port # ${port}`)
})