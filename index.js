const URL = `https://striveschool-api.herokuapp.com/api/product/`;
const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODhhNDFjMjUwNDAwMTUxYWI2ODEiLCJpYXQiOjE3NDYxNzYxNjQsImV4cCI6MTc0NzM4NTc2NH0.Ifdzly0QqcVoZg3Tys6QeuGHwHrl83PAIHH_Bq_X5wY`;

// spinner
const isLoading = (boolean) => {
  const spinner = document.querySelector(`.spinner-border`);
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// alert
const generateAlert = (message) => {
  const container = document.getElementById("main-container");

  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.role = "alert";
  alert.innerText = message;

  container.appendChild(alert);

  isLoading(false);
};

const container = document.getElementById("products-container");

const getProducts = () => {
  isLoading(true);

  fetch(URL, {
    headers: {
      Authorization: AUTH_TOKEN
    }
  })
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 401) throw new Error(`Unauthorized`);
        else if (resp.status === 404) throw new Error(`Products not found`);
        else if (resp.status >= 500) throw new Error(`Server error`);
        throw new Error(`Generic error in fetch`);
      }
      return resp.json();
    })
    .then((products) => {
      console.log(products);
      const row = document.getElementById("products-row");
      row.innerHTML = "";

      products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-4 mb-4";

        col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>${product.price}€</strong></p>
            <a href="details.html?id=${product._id}" class="btn btn-primary">Scopri di più</a>
            <a href="backoffice.html?id=${product._id}" class="btn btn-warning ms-2">Modifica</a>
          </div>
        </div>
      `;

        row.appendChild(col);
      });
    })
    .catch((err) => {
      console.error("Errore nel caricamento prodotti:", err);
      generateAlert(err.message);
    })
    .finally(() => {
      isLoading(false);
    });
};

window.onload = function () {
  getProducts();
};
