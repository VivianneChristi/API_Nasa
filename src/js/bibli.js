function fetchAllNasaImages() {
    fetch('https://images-api.nasa.gov/search?media_type=image')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        const imgContainer = document.querySelector('.biblioteca');
        const items = data.collection.items;

        items.forEach(item => {
            const imageUrl = item.links[0].href;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = 'Imagem da NASA'; // Definindo um texto alternativo padrão para a imagem

            const figureElement = document.createElement('figure');

            figureElement.appendChild(imgElement);

            imgContainer.appendChild(figureElement);
        });
    })
    .catch(error => console.error('Erro ao fazer a chamada da API da NASA:', error));
}

// Chama fetchAllNasaImages uma vez para exibir todas as imagens
fetchAllNasaImages();