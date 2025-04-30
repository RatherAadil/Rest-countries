const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const darkMode = document.querySelector('.dark-mode')
const show = document.querySelector(".show")
const hidden = document.querySelector(".hidden")
let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    const region = e.target.value
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data)
        })
})


function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
        <img src="${country.flags.svg} " alt="${country.flags.alt}">
        <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>`
        countriesContainer.append(countryCard)
    });
}

searchInput.addEventListener('input', (e) => {
    const filteredCountry = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountry)
})

let savedTheme = JSON.parse(localStorage.getItem('theme')) || {
    color: 'light',
    class: 'fa-moon'
};

document.body.classList.add(savedTheme.color);
darkMode.firstElementChild.classList.add(savedTheme.class);
darkMode.addEventListener('click', () => {
    if (savedTheme.color === 'light') {
        document.body.classList.replace('light', 'dark');
        darkMode.firstElementChild.classList.remove(savedTheme.class);
        savedTheme.color = 'dark';
        savedTheme.class = 'fa-sun';
        darkMode.firstElementChild.classList.add(savedTheme.class);
    } else {
        document.body.classList.replace('dark', 'light');
        darkMode.firstElementChild.classList.remove(savedTheme.class);
        savedTheme.color = 'light';
        savedTheme.class = 'fa-moon';
        darkMode.firstElementChild.classList.add(savedTheme.class);
    }

    localStorage.setItem('theme', JSON.stringify(savedTheme));
});
