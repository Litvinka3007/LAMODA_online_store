const headerCityButton = document.querySelector('.header__city-button');
const goodsTitle = document.querySelector('.goods__title');
let navList = document.querySelector('.navigation__list');
let hash = location.hash.substring(1);

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
  const data = await fetch('db.json');       // ПОЛУЧАЕМ ДАННЫЕ ИЗ БАЗЫ ДАННЫХ
                                             // await позволяет не выполняет выполнять присваивание до тех пор, пока fetch не вернёт ответ
  if (data.ok) {
    return data.json()
  } else {
    throw new Error(`Данные не были получены. Ошибка ${data.status} ${data.statusText}`);
  }
};

const getGoods = (callback, value) => {      // ОБРАБАТЫВАЕМ ПОЛУЧЕННЫЕ ДАННЫЕ
  getData()                                  // Красиво
        .then(data => {
          if (value) {
            callback(data.filter(item => item.category === value))
          } else {
            callback(data);
          }
        })
        .catch(err => {
          console.error(err)
        });
};

/*getGoods((data) => {                       // ВЫЗЫВАЕМ / ПРОВЕРЯЕМ, ЧТО ВСЁ РАБОТАЕТ
  console.warn(data)
})*/

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', event => {
  const target = event.target;

  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose();
  }
});

navList.addEventListener('click', event => {
  const target = event.target;
  goodsTitle.textContent = target.innerText;
});

try {
  const goodsList = document.querySelector('.goods__list');

  if (!goodsList) {
    throw 'This is not a goods page!'
  }

  const createCard = ({ id, preview, cost, brand, name, sizes }) => { // Деструктуризация

    const li = document.createElement('li');

    li.classList.add('goods__item');

    li.innerHTML = `
      <article class="good">
          <a class="good__link-img" href="card-good.html#${id}">
              <img class="good__img" src="goods-image/${preview}" alt="">
          </a>
          <div class="good__description">
              <p class="good__price">${cost} &#8381;</p>
              <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
              ${sizes ?
                   `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
                   ''}
              <a class="good__link" href="card-good.html#${id}">Подробнее</a>
          </div>
      </article>
    `;

    return li;
  }

  const renderGoodsList = data => {
    goodsList.textContent = '';

    /*for (let i = 0; i < data.length; i++) {
      console.log('for: ', data[i]);
    }

    for (const item of data) {
      console.log('for/of: ', item);
    }*/

    data.forEach(item => {
      const card = createCard(item);
      goodsList.append(card);
    })
  };

  window.addEventListener('hashchange', () => {
    hash = location.hash.substring(1);
    getGoods(renderGoodsList, hash);
  })

  getGoods(renderGoodsList, hash);

} catch(err) {
    console.log(err)
}

/*getData().then(data => { // Некрасиво
  console.log(data);
}, err => {
  console.error(err)
})*/


/*async function foo() { // function declaration

}

const bar = async function() { // function expression

}*/
