document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const pizzaNumberInput = document.getElementById("pizza-number");
  const resultContainer = document.getElementById("result-container");

  const pizzas = [
    {
      id: 1,
      nombre: "Pizza de Muzzarella",
      precio: 500,
      imagen: "img/muzzarella.png",
    },
    {
      id: 2,
      nombre: "Pizza de Cebolla",
      precio: 1500,
      imagen: "img/cebolla.png",
    },
    {
      id: 3,
      nombre: "Pizza 4 Quesos",
      precio: 1380,
      imagen: "img/4quesos.png",
    },
    {
      id: 4,
      nombre: "Pizza Especial",
      precio: 1000,
      imagen: "img/especial.png",
    },
    {
      id: 5,
      nombre: "Pizza con anana",
      precio: 600,
      imagen: "img/anana.png",
    },
  ];

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = parseInt(pizzaNumberInput.value);
    const foundPizza = pizzas.find((pizza) => pizza.id === searchValue);

    if (!isNaN(searchValue)) {
      if (foundPizza) {
        displayPizzaCard(foundPizza);

        localStorage.setItem("lastSearchedPizzaId", foundPizza.id);
      } else {
        displayErrorMessage("No se encontró ninguna pizza con ese número.");
      }
    } else {
      displayErrorMessage("Por favor, ingresa un número válido.");
    }

    pizzaNumberInput.value = "";
  });

  function getLastSearchedPizzaId() {
    return localStorage.getItem("lastSearchedPizzaId");
  }

  const lastSearchedPizzaId = getLastSearchedPizzaId();
  if (lastSearchedPizzaId) {
    const lastSearchedPizza = pizzas.find(
      (pizza) => pizza.id === parseInt(lastSearchedPizzaId)
    );
    if (lastSearchedPizza) {
      displayPizzaCard(lastSearchedPizza);
    }
  }

  function displayPizzaCard(pizza) {
    resultContainer.innerHTML = `
        <div class="card">
          <img src="${pizza.imagen}" alt="${pizza.nombre}">
          <h3>${pizza.nombre}</h3>
          <p>Precio: $${pizza.precio}</p>
        </div>
      `;
    resultContainer.classList.remove("hidden");
  }

  function displayErrorMessage(message) {
    resultContainer.innerHTML = `<p class="error-message">${message}</p>`;
    resultContainer.classList.remove("hidden");
  }
});
