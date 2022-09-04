const urlParams = new URLSearchParams(window.location.search);
const brandname = urlParams.get("brandname");
console.log(brandname);

const url = `https://kea-alt-del.dk/t7/api/products?limit=100&brandname=${brandname}`;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  data.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);
  //grab the template & clone it
  const template = document.querySelector("#smallProductTemplate").content;
  const copy = template.cloneNode(true);

  //change content
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype}|${product.brandname}`;
  copy.querySelector("h3").textContent = product.productdisplayname;
  //change url
  copy.querySelector("a").href = `product.html?id=${product.id}`;

  //changing image and alt
  copy.querySelector(
    ".smallProduct img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector(".smallProduct img").alt = product.productdisplayname;
  // is it soldOut/onSale
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
  }
  // percents, not currency
  copy.querySelector(".discounted p").textContent =
    product.price / product.discount;

  //find parent & append
  const parent = document.querySelector("main");
  parent.appendChild(copy);
}
