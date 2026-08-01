const NASA_KEY = "DEMO_KEY";

async function getTodaySpace() {

    document.getElementById("apod-loading").classList.remove("hidden");

    try {

        let response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
        );

        let data = await response.json();

        document.getElementById("apod-image").src = data.url;
        document.getElementById("apod-title").innerHTML = data.title;
        document.getElementById("apod-date-detail").innerHTML =
            `<i class="far fa-calendar me-2"></i>${data.date}`;

        document.getElementById("apod-date-info").innerHTML = data.date;

        document.getElementById("apod-explanation").innerHTML =
            data.explanation;

        document.getElementById("apod-copyright").innerHTML =
            data.copyright ? `© ${data.copyright}` : "© NASA";

    } catch (error) {

        console.log(error);

    } finally {

        document.getElementById("apod-loading").classList.add("hidden");
    }
}

getTodaySpace();
async function getLaunches() {

    try {

        let response = await fetch(
            "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=6"
        );

        let data = await response.json();

        displayLaunches(data.results);

    } catch (error) {

        console.log(error);

    }

}

function displayLaunches(arr) {

    let cartona = "";

    for (let i = 0; i < arr.length; i++) {

        let launch = arr[i];

        cartona += `
        <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">

            <img src="${launch.image || "https://placehold.co/600x400?text=No+Image"}"
                 class="w-100"
                 style="height:220px;object-fit:cover;">

            <div class="p-4">

                <h4 class="text-white fw-bold mb-3">
                    ${launch.name}
                </h4>

                <p class="text-secondary">
                    <i class="fas fa-building"></i>
                    ${launch.launch_service_provider.name}
                </p>

                <p class="text-secondary">
                    <i class="fas fa-calendar"></i>
                    ${new Date(launch.net).toLocaleDateString()}
                </p>

                <p class="text-secondary">
                    <i class="fas fa-map-marker-alt"></i>
                    ${launch.pad.location.name}
                </p>

                <p class="text-secondary">
                    <i class="fas fa-rocket"></i>
                    ${launch.rocket.configuration.name}
                </p>

                <span class="badge bg-primary">
                    ${launch.status.name}
                </span>

            </div>

        </div>
        `;
    }

    document.getElementById("launches-grid").innerHTML = cartona;

}
document.getElementById("load-date-btn").addEventListener("click", function () {

    let date = document.getElementById("apod-date-input").value;

    getSpaceByDate(date);

});
getLaunches();
const planets = document.querySelectorAll(".planet-card");

async function getPlanet(name) {
  try {
    const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${name}`);
    const data = await response.json();

    displayPlanet(data, name);

  } catch (error) {
    console.log(error);
  }
}

function displayPlanet(data, name) {

  document.getElementById("planet-detail-name").innerHTML = data.englishName;
  document.getElementById("planet-detail-image").src = `./assets/images/${name}.png`;

  document.getElementById("planet-detail-description").innerHTML =
    `${data.englishName} is one of the planets in our Solar System.`;

  document.getElementById("planet-distance").innerHTML =
    data.semimajorAxis.toLocaleString() + " km";

  document.getElementById("planet-radius").innerHTML =
    data.meanRadius + " km";

  document.getElementById("planet-mass").innerHTML =
    data.mass.massValue + " ×10^" + data.mass.massExponent + " kg";

  document.getElementById("planet-density").innerHTML =
    data.density + " g/cm³";

  document.getElementById("planet-orbital-period").innerHTML =
    data.sideralOrbit + " days";

  document.getElementById("planet-rotation").innerHTML =
    data.sideralRotation + " hrs";

  document.getElementById("planet-moons").innerHTML =
    data.moons ? data.moons.length : 0;

  document.getElementById("planet-gravity").innerHTML =
    data.gravity + " m/s²";

  document.getElementById("planet-discoverer").innerHTML =
    data.discoveredBy || "Unknown";

  document.getElementById("planet-discovery-date").innerHTML =
    data.discoveryDate || "Unknown";

  document.getElementById("planet-body-type").innerHTML =
    data.bodyType;

  document.getElementById("planet-volume").innerHTML =
    data.vol?.volValue
      ? data.vol.volValue + " ×10^" + data.vol.volExponent + " km³"
      : "Unknown";

  document.getElementById("planet-perihelion").innerHTML =
    data.perihelion.toLocaleString() + " km";

  document.getElementById("planet-aphelion").innerHTML =
    data.aphelion.toLocaleString() + " km";

  document.getElementById("planet-eccentricity").innerHTML =
    data.eccentricity;

  document.getElementById("planet-inclination").innerHTML =
    data.inclination + "°";

  document.getElementById("planet-axial-tilt").innerHTML =
    data.axialTilt ? data.axialTilt + "°" : "Unknown";

  document.getElementById("planet-temp").innerHTML =
    "Unknown";

  document.getElementById("planet-escape").innerHTML =
    data.escape + " m/s";

  document.getElementById("planet-facts").innerHTML = `
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span>Gravity: ${data.gravity} m/s²</span>
      </li>

      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span>Mean Radius: ${data.meanRadius} km</span>
      </li>

      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span>Orbital Period: ${data.sideralOrbit} days</span>
      </li>

      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span>Moons: ${data.moons ? data.moons.length : 0}</span>
      </li>
  `;
}

for (let i = 0; i < planets.length; i++) {

  planets[i].addEventListener("click", function () {

    let planetName = this.dataset.planetId;

    getPlanet(planetName);

  });

}

getPlanet("earth");