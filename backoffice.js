const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get(`id`);
console.log(`ID`, productId);

const URL = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";
const method = productId ? "PUT" : "POST";
const AUTH_TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODhhNDFjMjUwNDAwMTUxYWI2ODEiLCJpYXQiOjE3NDYxNzYxNjQsImV4cCI6MTc0NzM4NTc2NH0.Ifdzly0QqcVoZg3Tys6QeuGHwHrl83PAIHH_Bq_X5wY`;

const form = document.getElementById("product-form");
const delBtn = document.getElementById("delete-btn");

window.onload = function () {
  const title = document.getElementById(`title`);

  if (productId) {
    title.innerText = `- Edit product`;
    delBtn.classList.remove(`d-none`);

    fetch(URL, {
      headers: {
        Authorization: AUTH_TOKEN
      }
    })
      .then((resp) => {
        if (!resp.ok) throw new Error(`Error loading product`);
        return resp.json();
      })
      .then((product) => {
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("imageUrl").value = product.imageUrl;
        document.getElementById("price").value = product.price;
      })
      .catch((err) => console.error(err));
  } else {
    title.innerText = `- Create new product`;
  }
};

form.onsubmit = function (e) {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value)
  };
  console.log("Sending product:", newProduct);

  fetch(URL, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN
    },
    body: JSON.stringify(newProduct)
  })
    .then((resp) => {
      if (!resp.ok) throw new Error(`Error in the request`);
      return resp.json();
    })
    .then((createdProduct) => {
      if (productId) {
        alert(`Updated product: ` + createdProduct.name);
        window.location.reload(); // to reload the page
        // window.location.assign(`./index.html`); // to go back to the homepage
      } else {
        alert(`Product created with ID: ` + createdProduct._id);
        form.reset();
      }
    })
    .catch((err) => console.error(err));
};

// delete product
delBtn.onclick = function () {
  const confirmDelete = confirm(`Do you really want to delete this product?`);
  if (confirmDelete) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: AUTH_TOKEN
      }
    })
      .then((resp) => {
        if (resp.ok) {
          alert(`Product successfully deleted`);
          window.location.assign(`./index.html`);
        } else {
          throw new Error(`Error deleting`);
        }
      })
      .catch((err) => console.error(err));
  }
};

//reset btn
const resetBtn = document.getElementById("reset-btn");

resetBtn.onclick = function () {
  const confirmReset = confirm("Do you really want to reset all the fields?");
  if (confirmReset) {
    form.reset();
    alert("Fields successfully reset.");
  }
};
