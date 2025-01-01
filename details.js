const loader = document.getElementById('loader');
const detailsContainer = document.getElementById('details-container');

loader.style.display = 'flex';

fetch('https://script.google.com/macros/s/AKfycbzjtcbW6PSnbg-3SS3C_CnMl2wGRAN9Gj6jXQVq3yuBmQFCMS0mFX0BczNNKJGfRYaepg/exec', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        loader.style.display = 'none';
        const currentIndex = localStorage.getItem('currentIndex');
        const row = data[currentIndex];
        const html = `
            <div class="frames">
            <iframe src="${row[2]}"></iframe>
            <img src="${row[3]}">
            <img src="${row[4]}">
            </div>
            <div class="text">
            <h2>${row[0]}</h2>
            <p class="des">${row[1]}</p>
            <p class="prince">Price: ₹${row[5]}</p>
            <button id="buy-now-button">Buy Now</button>
            </div>
        `;
        detailsContainer.innerHTML = html;

        document.getElementById('buy-now-button').addEventListener('click', () => {
            const message = `Title: ${row[0]}\nVideo: ${row[2]}\nPrice: ${row[5]}`;
            const whatsappUrl = `https://t.me/Blcm_id_seller?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    })
    .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
    });