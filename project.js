function getImages() {
    const url = "https://api.fbi.gov/wanted/v1/list";

    fetch(url)
        .then((result) => result.json())
        .then(data => {
            const carousel = document.getElementById('carousel');
            const namesContainer = document.getElementById('criminal-names');
            const criminals = data.items.slice(0, 10);

            criminals.forEach((criminal) => {
                if (criminal.images && criminal.images.length > 0) {
                    const img = document.createElement('img');
                    img.src = criminal.images[0].original;
                    img.alt = criminal.title || "Most Wanted Criminal";
                    carousel.appendChild(img);

                    const name = document.createElement('div');
                    name.textContent = criminal.title || "Unknown Name";
                    namesContainer.appendChild(name);
                }
            });
            setTimeout(() => {
                simpleslider.getSlider({
                    container: carousel,
                    delay: 3,
                    duration: 0.5
                });
            }, 300);
        })
}

window.onload = getImages;