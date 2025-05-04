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
      document.getElementById("product-brand").innerText = "by " + product.brand;
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

// function to change page when clicking the go-to-course-btn

const courseLinks = {
  "6814e0311c250400151ab88c":
    "https://www.udemy.com/course/learn-digital-marketing-course/?srsltid=AfmBOoqecmciQASr2j9MfOjZKC1PefTivF-W_bh1Gtv391gw5UmV9x5q&couponCode=LETSLEARNNOW",
  "681676ff43d738001547bc86": "https://epicode.com/it/corso-web-developer/",
  "68167cd143d738001547bc89": "https://www.coursera.org/learn/data-analysis-with-python",
  "68167d4a43d738001547bc8a": "https://epicode.com/it/corso-cybersecurity/",
  "68167dc743d738001547bc8b": "https://epicode.com/it/game-developer/",
  "68167e5e43d738001547bc8c":
    "https://www.udemy.com/course/seo_chatgpt/?srsltid=AfmBOoqu7KvjZ_e6AG36FrZqsmSOetdn6l-AL9J83-e0s5LNsNEpLJHv&couponCode=LETSLEARNNOW",
  "68178cfeaea44d001572c80d": "https://epicode.com/it/corso-ux-ui-design/",
  "6817a662aea44d001572c81a": "https://epicode.com/it/corso-web-developer-part-time/"
};

document.getElementById(`go-to-course-btn`).addEventListener(`click`, function (e) {
  e.preventDefault();

  const courseUrl = courseLinks[productId];

  if (courseUrl) {
    window.open(courseUrl, "_blank");
  } else {
    alert(`No external course link available for this product.`);
  }
});
