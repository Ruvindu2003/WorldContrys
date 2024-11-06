let searchbar = document.getElementById('searchInput');
let allCountries = [];
let filteredCountries = [];

async function loadItems() {
    let res = await fetch("https://restcountries.com/v3.1/all");
    allCountries = await res.json();
    filteredCountries = [...allCountries];
    renderCountries(filteredCountries);
}

// Render the countries to the DOM
function renderCountries(countries) {
    let body = "";
    countries.forEach(country => {
        let flag = country.flags.png; 
        let name = country.name.common; 
        let population = country.population; 
        let region = country.region; 
        let capital = country.capital
        
        body += `
            <div class="col card-group">
                <div class="card shadow-sm card-img-top rounded-4">
                    <img src="${flag}" class="card-img-top" alt="${name} flag">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">Region: ${region}</p>
                        <p class="card-text">Capital: ${capital}</p>
                        <p class="card-text">Population: ${population.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("row").innerHTML = body;
}


function searchCountries() {
    let searchdata = searchbar.value.toLowerCase(); 
    filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchdata)
    );
    renderCountries(filteredCountries);
}


loadItems();