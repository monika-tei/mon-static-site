const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

//fetch the data
fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));
// populate the page

function showProduct(product) {
  console.log(product);

  document.querySelector(".breadcrumbs .brand").textContent = product.brandname;
  document.querySelector(".breadcrumbs .productname").textContent =
    product.productdisplayname;

  document.querySelector(
    "img.productimage"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  document.querySelector("img.productimage").alt = product.productdisplayname;

  //Product Information template
  const template = document.querySelector("template.templateInfo").content;
  const copy = template.cloneNode(true);
  // model name
  copy.querySelector(".modelName").textContent = product.productdisplayname;
  //change color
  copy.querySelector(".itemColor").textContent = product.colour1;
  //change inventory number
  copy.querySelector(".itemId").textContent = product.id;
  //change brand name
  copy.querySelector(".itemBrand").textContent = product.brandname;
  //change brand bio
  copy.querySelector(".brandBio").textContent = product.brandbio;
  //append and parent
  const parent = document.querySelector(".info");
  parent.appendChild(copy);

  //Purchase box template
  const purchase = document.querySelector("template.templatePurchase").content;
  const box = purchase.cloneNode(true);
  //make changes
  box.querySelector(".itemBrand").textContent = product.productdisplayname;
  box.querySelector(
    ".itemDetails"
  ).textContent = `${product.brandname}|${product.articletype}`;

  //find parents
  const parenttwo = document.querySelector(".purchaseBox");
  parenttwo.appendChild(box);
}
