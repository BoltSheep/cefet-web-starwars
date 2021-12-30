// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import {AudioPlayer} from "./music.js"
import {restartAnimation} from "./restart-animation.js"

const API_ENDPOINT = 'https://swapi.dev/api'
const romanos = ["","I","II","III","IV","V","VI"]

function main() {
    try{
        getFilms();
    } catch {
        carregaIntro({episode_id: 0, title: 'Error!', opening_crawl: 'Jarjar binks roubou o texto!!\n Tente recarregar a pagina.'});
    }

    const musica = new AudioPlayer()
    musica.start({audioUrl: "audio/tema-sw.mp3", coverImageUrl: "imgs/logo.svg", title: "Intro" , artist: "John Williams"}, document.body);
    musica.play();
}

async function getFilms() {
    const resposta = await fetch(`${API_ENDPOINT}/films/`) 
    const dados = await resposta.json()
    
    dados.results.sort((filmeA, filmeB) => filmeA.episode_id > filmeB.episode_id ? 1 : -1)
    
    let listaEl = document.getElementById("lista-filmes");
    dados.results.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = `EPISODIO ${romanos[element.episode_id]}`.padEnd(13,' ') + `- ${element.title}`;
        li.addEventListener("click", () => carregaIntro(element))
        listaEl.appendChild(li);
    });
    carregaIntro(dados.results[0])
}

function carregaIntro(element) {
    const resume = document.getElementById('pre-text');
    const texto = `Episodio ${romanos[element.episode_id]}\n${element.title.toUpperCase()}\n\n${element.opening_crawl}`;
    console.log(texto);
    resume.innerHTML = texto;

    restartAnimation(resume)
}



main();