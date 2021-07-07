const headerCityButton = document.querySelector('.header__city-button')

/*if (localStorage.getItem('lamoda-location')) {
  headerCityButton.textContent = localStorage.getItem('lamoda-location');
}*/

headerCityButton.textContent = localStorage.getItem('lamoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите Ваш город');
  headerCityButton.textContent = city;
  localStorage.setItem('lamoda-location', city);
});

// Блокировка скролла вариант №1

/*const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = '';
};*/

// Блокировка скролла вариант №2

const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.body.dbScrollY = window.scrollY;

  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `;
};

const enableScroll = () => {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY,
  })
};

// Модальное окно

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
};

const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open');
  enableScroll();
};

/*cartOverlay.addEventListener('keypress', function(EO) {
  EO = EO || window.event;
  EO.preventDefault();

  if (EO.keyCode === 27) {
    cartModalClose();
  }
}, false);*/

// Запрос базы данных

const getData = async () => {                // async пишется в разных местах в зависимости от вида ф-ии, обозначает асинхронность
  const data = await fetch('db.json'); // ПОЛУЧАЕМ ДАННЫЕ ИЗ БАЗЫ ДАННЫХ
                                             // await позволяет не выполняет выполнять присваивание до тех пор, пока fetch не вернёт ответ
  if (data.ok) {
    return data.json()
  } else {
    throw new Error(`Данные не были получены. Ошибка ${data.status} ${data.statusText}`);
  }
};

const getGoods = (callback) => {             // ОБРАБАТЫВАЕМ ПОЛУЧЕННЫЕ ДАННЫЕ
  getData()                  // Красиво
        .then(data => {
          callback(data);
        })
        .catch(err => {
          console.error(err)
        });
};

getGoods((data) => {                 // ВЫЗЫВАЕМ / ПРОВЕРЯЕМ, ЧТО ВСЁ РАБОТАЕТ
  console.warn(data)
})

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose();
  }
});


/*getData().then(data => { // Некрасиво
  console.log(data);
}, err => {
  console.error(err)
})*/


/*async function foo() { // function declaration

}

const bar = async function() { // function expression

}*/
