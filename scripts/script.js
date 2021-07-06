const headerCityButton = document.querySelector('.header__city-button')

/*if (localStorage.getItem('lamoda-location')) {
  headerCityButton.textContent = localStorage.getItem('lamoda-location');
}*/

headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите Ваш город');
  headerCityButton.textContent = city;
  localStorage.setItem('lamoda-location', city);
})