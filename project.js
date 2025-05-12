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

function officeChart() {
    const url = "https://api.fbi.gov/wanted/v1/list";
    fetch(url)
        .then(response => response.json())
        .then(data => {
          const officeCounts = {};

          data.items.forEach(item => {
            if (item.field_offices) {
              item.field_offices.forEach(office => {
                officeCounts[office] = (officeCounts[office] || 0) + 1;
              });
            }
          });

          const labels = Object.keys(officeCounts);
          const counts = Object.values(officeCounts);

          const ctx = document.getElementById('wantedChart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Wanted Individuals per Field Office',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Field Office'
                  }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Individuals'
                  }
                }
              }
            }
          });
        });
}

window.onload = function () {
  officeChart();
  getImages();
};