require("dotenv").config()

const express = require("express");
const path = require("path")
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

//models

const characterList = [{
    id: 1,
    heroi: "Homem De Ferro",
    nome:"Anthony Edward Stark",
    altura:"2,00m (Com a Armadura)",
    peso:"193kg (Com a Armadura)",
    especie:"humano",
    sobre:"Gênio, bilionário, playboy, filantropo.",
    alianca: "Vingadores",
    imagem: "https://imagensemoldes.com.br/wp-content/uploads/2020/05/Imagem-Marvel-Homem-de-Ferro-PNG.png",
    imagem2: "https://s2.glbimg.com/6r7EXCo-eLrg6nWbSkGLTYB9KBo=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/B/O/MSPOfAQfAtCmBYfTZpDg/tony-star-homem-de-ferro-1-div-paramount.jpg",
    imgbg:"https://wallpapercave.com/wp/wp3322454.jpg"
}, {
    id: 2,
    heroi: "Capitão América",
    nome:"Steven Grant Rogers",
    altura:"1,88m",
    peso:"89kg",
    especie:"humano",
    sobre: "A sua esquerda.",
    alianca: "Vingadores",
    imagem: "https://i0.wp.com/multarte.com.br/wp-content/uploads/2019/03/capitao-america-png3.png?resize=696%2C1025&ssl=1",
    imagem2: "https://i.pinimg.com/originals/2d/52/fa/2d52fa000a2e00d1d96f328cd19baccc.jpg",
    imgbg: "https://www.wallpapertip.com/wmimgs/9-98840_captain-america-wallpaper-hd-convite-de-aniversario-capito.jpg"
}
]


let character = undefined;
let message = "";
let check = 1;

//rotas


//rota principal
app.get("/", (req, res) => {

    setTimeout(() => {
        message = "";
        check = 2
      }, 3000);

    res.render("index", { characterList, character, message, check });
});


// rota de create
app.post("/add", (req, res) => {
    const character = req.body;

    character.id = characterList.length + 1;
    characterList.push(character);

    message =`Parabéns, ${character.heroi} foi adicionando com sucesso a sua lista` ;
    res.redirect("/#cards");

});

// rota de leitura
app.get("/detalhes/:id", (req, res) => {
    const id = Number(req.params.id);

    check = 1

    character = characterList.find(character => character.id === id);
    res.redirect("/");
})

app.get("/vermais/:id",(req,res)=> {
    const id = Number(req.params.id);
    character = characterList.find(character => character.id === id);

    check = 0;

    res.redirect("/")

})

//rota de editar/update
app.post("/update/:id", (req, res) => {
    const id = Number(req.params.id -1);

    const newCharacter = req.body;
    characterList[id] = newCharacter;
    newCharacter.id = id + 1;
    
    character = undefined;
    
    res.redirect("/#cards")

})

//rota de delete
app.get("/deletar/:id", (req,res) => {
    const id = Number(req.params.id - 1);
    const character = req.body;

    character.id = characterList.length;
    delete characterList[id]
 

    res.redirect("/#cards")
} )



app.listen(port, () => console.log(`servidor rodando em http://localhost:${port}`));