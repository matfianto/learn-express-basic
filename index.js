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

app.get("/", (req, res) => res.send("<h1>hello world<h1>"));
app.get("/woi", (req, res) => res.send("<h1>hello woi org<h1>"));
app.get("/woi/coi", (req, res) => res.send("<h1>hello coi<h1>"));

app.get("/berita", (req, res) => res.json(data));
app.get("/berita/:id", (req, res) => {
    const idBerita = request.params.id;
    const detailBerita = data.filter((item) => item.id === parseInt(idBerita));
    if(detailBerita.length === 0)  {
        response.json({error : `jumlah berita hanya ada ${data.length}`});
    } else {
        response.json(detailBerita)
    }
});

app.listen(port, () =>console.log("app berjalan pada port " + port)); //best practice
// app.listen(port, console.log("app berjalan di port " + port));
// app.listen(port);