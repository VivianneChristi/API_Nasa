// Função para buscar e exibir imagens aleatórias da NASA nos cards
function fetchRandomNasaImages() {
    fetch('https://images-api.nasa.gov/search?q=Mars')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const imgElements = document.querySelectorAll('.jornal_de_imagens_cards img');
            const items = data.collection.items;
            const randomIndexes = getRandomIndexes(items.length, imgElements.length);
            
            for (let i = 0; i < imgElements.length; i++) {
                const randomIndex = randomIndexes[i];
                const imageUrl = items[randomIndex].links[0].href;
                imgElements[i].src = imageUrl;
                imgElements[i].alt = items[randomIndex].data[0].title || 'Imagem da NASA';
            }
        })
        .catch(error => console.error('Erro ao fazer a chamada da API da NASA:', error));
}

// Função para gerar índices aleatórios
function getRandomIndexes(max, count) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

// Chama fetchRandomNasaImages uma vez para exibir as primeiras imagens
fetchRandomNasaImages();

// Atualiza as imagens aleatórias a cada 30 segundos
setInterval(fetchRandomNasaImages, 10000); // 10000 milissegundos = 10 segundos
// ----------------------------------------------------Fim Newspaper index ------------------------------------------------------------

//------------------------------------------ Script da Earth ----------------------------------------------


async function locaisTerra(){
let lon = 43.21;
let lat = 22.95;
let ano = 2018;
const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${ano}-01-01&&dim=0.10&api_key=9WBfmyWKPIgoa0zmt2sGuWaCEYap3aL2zbaY9DrF`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const imgElements = document.querySelectorAll('.container');
            const image = data.url;
            console.log(image);
            
            for (let i = 0; i < imgElements.length; i++) {
                const randomIndex = randomIndexes[i];
                const imageUrl = items[randomIndex].links[0].href;
                imgElements[i].src = imageUrl;
                imgElements[i].alt = items[randomIndex].data[0].title || 'Imagem da NASA';
            }
        })
        .catch(error => console.error('Erro ao fazer a chamada da API da NASA:', error));

;}

locaisTerra();

//------------------------------------------ FIM Script da Earth ----------------------------------------------

//------------------------------------------ Inicio Script Rover ----------------------------------------------


function visualizarFotos() {
    var roverSelecionado = document.getElementById("rover").value;
    fetchRoverImages(roverSelecionado);
}

async function fetchRoverImages(rover) {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=DEMO_KEY`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const imgContainer = document.querySelector('.imagens_rover');
            imgContainer.innerHTML = ''; // Limpa as imagens anteriores
            
            data.photos.forEach(photo => {
                const imageUrl = photo.img_src;
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Foto do rover em Marte';
                imgContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Erro ao fazer a chamada da API da NASA:', error));
}

//------------------------------------------ Fim Script Rover ----------------------------------------------