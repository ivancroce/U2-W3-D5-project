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
  const alertContainer = document.getElementById("alert-container");

  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.role = "alert";
  alert.innerText = message;

  alertContainer.appendChild(alert);

  isLoading(false);
};

// products
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
        col.className = "col-sm-6 col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
          <div class="card card-tech h-100">
          <a href="details.html?id=${product._id}">
            <img
              src="${product.imageUrl}"
              class="card-img-top h-auto"
              alt="${product.name}"/></a>
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title">${product.name}</h5>
                <p class="teacher-name">by ${product.brand}</p>
                <p class="card-text text-muted small">
                  ${product.description}
                </p>
              </div>
              <div class="mt-3 d-flex flex-wrap justify-content-between align-items-center">
                <span class="price-tag">${product.price} €</span>
                <div class="d-flex gap-2 mt-2">
                  <a href="details.html?id=${product._id}" class="btn btn-primary d-inline-flex align-items-center gap-1 py-2">
                    <i class="bi bi-file-earmark-text"></i>
                    <span>Learn More</span>
                  </a>
                  <a href="backoffice.html?id=${product._id}" class="btn btn-warning d-inline-flex align-items-center gap-1 py-2">
                    <i class="bi bi-pencil-square"></i>
                    <span>Edit</span>
                  </a>
                </div>
              </div>
            </div>
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

// function to change navbar color when scrolling
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.onload = function () {
  getProducts();
};
