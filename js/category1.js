//fetch the content

fetch("https://kea-alt-del.dk/t7/api/brands")
  .then((res) => res.json())
  .then(goThroughEach);

//forreach
function goThroughEach(data) {
  //   console.log(data);
  data.forEach(showBrand);
}

function showBrand(oneBrand) {
  //is this working?
  console.log(oneBrand);
  //template flow here
  const template = document.querySelector("template").content;
  const myClone = template.cloneNode(true);
  //make changes
  myClone.querySelector("a").textContent = oneBrand.brandname;
  myClone.querySelector(
    "a"
  ).href = `productlist.html?brandname=${oneBrand.brandname}`;
  //still doesnt redirect to proper page? let's see

  //find parent
  const mom = document.querySelector(".brandList ol");
  mom.appendChild(myClone);
}
