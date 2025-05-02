const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get(`id`);
console.log(`ID`, productId);

if (!productId) {
  alert("Product not found");
  window.location.href = `./index.html`;
}

const URL = `https://striveschool-api.herokuapp.com/api/product/`;
const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODhhNDFjMjUwNDAwMTUxYWI2ODEiLCJpYXQiOjE3NDYxNzYxNjQsImV4cCI6MTc0NzM4NTc2NH0.Ifdzly0QqcVoZg3Tys6QeuGHwHrl83PAIHH_Bq_X5wY`;

const loadProductDetails = () => {
  fetch(URL + productId, {
    headers: {
      Authorization: AUTH_TOKEN
    }
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Product not found");
      return resp.json();
    })
    .then((product) => {
      console.log(product);

      // product details
      document.getElementById("product-name").innerText = product.name;
      document.getElementById("product-brand").innerText = product.brand;
      document.getElementById("product-description").innerText = product.description;
      document.getElementById("product-price").innerText = product.price;
      document.getElementById("product-image").src = product.imageUrl;
      document.getElementById("product-image").alt = product.name;
    })
    .catch((error) => {
      console.error("Error loading product details:", error);
      alert("Failed to load product details");
    });
};

// to load product details
window.onload = loadProductDetails;

// function to change page when clicking the edit product btn
const handlePageChange = function () {
  window.location.assign("./backoffice.html?id=" + productId);
};
