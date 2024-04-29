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


//------------------------------------------ Script da Earth ----------------------------------------------

async function locaisTerra() {
    const locais = [
        {
            nome: "Cristo Redentor",
            lat: -22.95,
            lon: -43.21,
            ano: [2016, 2018, 2020]
        },
        {
            nome: "Grande Muralha da China",
            lat: 40.43,
            lon: 116.57,
            ano: [2016, 2018, 2020]
        },
        {
            nome: "Machu Picchu",
            lat: -13.16,
            lon: -72.54,
            ano: [2016, 2018, 2020]
        },
        {
            nome: "Coliseu de Roma",
            lat: 41.89,
            lon: 12.49,
            ano: [2016, 2018, 2020]
        },
        {
            nome: "Chichén Itzá",
            lat: 20.68,
            lon: -88.56,
            ano: [2016, 2018, 2020]
        },
        {
            nome: "Taj Mahal",
            lat: 27.17,
            lon: 78.04,
            ano: [2016, 2018, 2020]
        },
        {
            nome: "Petra",
            lat: 30.32,
            lon: 35.44,
            ano: [2016, 2018, 2020]
        }
    ];

    document.getElementById('search').addEventListener('click', handleLocationSelection);

    async function handleLocationSelection() {
        const selectedLocationIndex = document.getElementById('localNum').selectedIndex;
        const selectedLocation = locais[selectedLocationIndex - 1]; // -1 para compensar o "Escolha um Local"

        const selectedYearIndex = document.getElementById('yearNum').selectedIndex;
        const year = locais[selectedLocationIndex - 1].ano[selectedYearIndex - 1];

        const lon = locais[selectedLocationIndex - 1].lon;
        const lat = locais[selectedLocationIndex - 1].lat;
        const ano = year;

        try {
            const response = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${ano}-01-01&&dim=0.10&api_key=9WBfmyWKPIgoa0zmt2sGuWaCEYap3aL2zbaY9DrF`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const imgContainer = document.querySelector('.container_Image_Earth');
            const image = data.url;
            console.log(image);
            const img = document.createElement('img');
            img.src = image;
            imgContainer.appendChild(img); // Adicionando a imagem ao elemento pai na página HTML
        } catch (error) {
            console.error('Erro ao fazer a chamada da API da NASA:', error);
        }
    }
}

locaisTerra();

//------------------------------------------ FIM Script da Earth ----------------------------------------------

//------------------------------------------ FIM Script da Earth ----------------------------------------------

//------------------------------------------ Inicio Script Rover ----------------------------------------------

function visualizarFotos() {
    var roverSelecionado = document.getElementById("rover").value;
    fetchRoverImages(roverSelecionado, 5);
}

function checkRoverSelection() {
    var roverSelecionado = document.getElementById("rover").value;
    if (roverSelecionado === "opportunity" || roverSelecionado === "spirit") {
        alert("Erro de Conexão: Este rover não está disponível no momento.");
        // Reverter a seleção para Curiosity
        document.getElementById("rover").value = "curiosity";
    }
}


async function fetchRoverImages(rover, count) {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=DEMO_KEY`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const imgContainer = document.querySelector('.imagens_rover');
            imgContainer.innerHTML = ''; // Limpa as imagens anteriores

            // Limita o número de fotos a serem exibidas
            const photos = data.photos.slice(0, count);

            photos.forEach(photo => {
                const imageUrl = photo.img_src;
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Foto do rover em Marte';
                const cardElement = document.createElement('div');
                cardElement.classList.add('card_rover');
                cardElement.appendChild(imgElement);
                imgContainer.appendChild(cardElement);
            });
        })
        .catch(error => console.error('Erro ao fazer a chamada da API da NASA:', error));
}


//------------------------------------------ Fim Script Rover ----------------------------------------------