const { response, request } = require("express");
const express = require("express");

const app = express();
const port = 5000;

const data = [
    {
        "id": 1,
        "judul": "Korupsi Bansos",
        "berita": "Bansos lagi-lagi dikorupsi"
    },
    {
        "id": 2,
        "judul": "Rafathar Punya Adik",
        "berita": "Baru lahir langsung Famous"
    },
    {
        "id": 3,
        "judul": "Tukul Arwana Beli Cupang",
        "berita": "Karena ikan Arwana sangat mahal"
    }
]

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    const login = true;
    if(login) {
        next();
    } else {
        res.json({error: "anda belum login !"})
    }
}


app.set("view engine", "ejs");

app.get("/greeting", (req,res) => {
    let name = "Rahmat Alfianto"
    const nameFromUser = req.query.name;
    if(nameFromUser) name = nameFromUser
    res.render("index", {name: name})
})

// app.use(logger);

// app.get("/", (req, res) => res.send("<h1>hello world<h1>"));
app.get("/woi", (req, res) => res.send("<h1>hello woi org<h1>"));
app.get("/woi/coi", (req, res) => res.send("<h1>hello coi<h1>"));

// app.get("/berita", (req, res) => res.json(data));
// app.get("/berita/:id", (req, res) => {
//     const idBerita = request.params.id;
//     const detailBerita = data.filter((item) => item.id === parseInt(idBerita));
//     if(detailBerita.length === 0)  {
//         response.json({error : `jumlah berita hanya ada ${data.length}`});
//     } else {
//         response.json(detailBerita)
//     }
// });

app.get("/", function(req,res,next){
    logger(req,res,next)
}, (req,res) => res.send("Rahmat News"));

app.get("/berita", (req,res,next)=>{
    res.json(data)
    logger(req,res,next)
    next()
}, function(req,res,next){
    console.log("Rahmattttt");
    next()
}, function(req,res,next){
    console.log("Apaaaa");
    // next() //tidak perlu
});


app.get("/berita/:idBerita", (req, res) => {
    const idBerita = req.params.idBerita;
    const detailBerita = data.filter((item) => item.id === parseInt(idBerita));
    if(detailBerita.length === 0)  {
        res.json({error : `jumlah berita hanya ada ${data.length}`});
    } else {
        res.json(detailBerita)
    }
});

// app.get("/category")


app.listen(port, () =>console.log("app berjalan pada port " + port)); //best practice
// app.listen(port, console.log("app berjalan di port " + port));
// app.listen(port);