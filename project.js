/*function getImages() {
    const url = "https://api.fbi.gov/wanted/v1/list";
    
    fetch(url)
        .then((result) => result.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            const criminals = data.items.slice(0, 10);

            criminals.forEach((criminal) => {
                if (criminal.images && criminal.images[0]) {
                    const img = document.createElement('img');
                    img.src = criminal.images[0].original;
                    img.alt = criminal.title || "Most Wanted Criminal";
                    carousel.appendChild(img);
                    console.log('Criminals fetched:', criminals);
                    console.log('Images added:', carousel.children.length);
                }
            });
            simpleslider.getSlider({
                container: document.getElementById('carousel'),
                delay: 3,
                duration: 0.5
            });
        })

}


window.onload = getImages();*/



function getImages() {
    const url = "https://api.fbi.gov/wanted/v1/list";
    
    fetch(url)
        .then((result) => result.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            const criminals = data.items.slice(0, 10);

            criminals.forEach((criminal) => {
                if (criminal.images && criminal.images.length > 0) {
                    const img = document.createElement('img');
                    img.src = criminal.images[0].original;
                    img.alt = criminal.title || "Most Wanted Criminal";
                    carousel.appendChild(img);
                }
            });

            // Give DOM a chance to reflow before initializing slider
            setTimeout(() => {
                simpleslider.getSlider({
                    container: carousel,
                    delay: 3,
                    duration: 0.5
                });
            }, 100);
        })
        .catch(error => console.error('Error fetching FBI data:', error));
}

document.addEventListener("DOMContentLoaded", getImages);