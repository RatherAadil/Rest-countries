const countryName = new URLSearchParams(location.search).get('name')
const backBtn = document.querySelector('.back-btn')
const flagImg = document.querySelector('.country-details img')
const countryTitle = document.querySelector(".details-text-container h2")
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const Capital = document.querySelector('.Capital')
const tld = document.querySelector('.tld')
const currencies = document.querySelector('.Currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const darkMode = document.querySelector('.dark-mode')
// console.log(countryName);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)
        flagImg.src = country.flags.svg
        countryTitle.innerText = country.name.common
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        tld.innerText = country.tld.join(', ')
        languages.innerText = Object.values(country.languages).join(', ')

        if (country.subregion) {
            subRegion.innerText = country.subregion
        }
        if (country.capital) {
            Capital.innerText = country.capital?.[0]
        }

        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common
        } else {
            nativeName.innerText = countryName
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        } else {
            currencies.innerText = `${countryName} has no currency`
        }
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a')
                        borderCountryTag.innerText = borderCountry.name.common
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag)

                    })
            });
        }

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
