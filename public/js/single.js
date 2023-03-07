const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("key");
const names = new URLSearchParams(queryString).get("name");
// const total = document.querySelector("#count");
const productName = document.querySelector("#name");
const productPrice = document.querySelector("#prices");
const mobileImage = document.querySelector("#mimg");
const desktopImage = document.querySelector("#dimg");
// const productDesc = document.querySelector("#desc");
// const productCategory = document.querySelector("#category");

async function getSingleProduct() {
  try {
    const { data: response } = await axios.get(`/api/v1/products/${id}`);
    const totalResponse = response.total_Product;
    const { name, price, image, description, category } =
      response.data.product[0];
    // total.innerHTML = totalResponse;
    productName.innerHTML = name;
    productPrice.value = price
    // productDesc.innerHTML = description;
    // productCategory.innerHTML = category;
    desktopImage.src = image;
    mobileImage.src = image;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
getSingleProduct();

const cartBtn = document.getElementById("cartBtn");
const quantity = document.getElementById("quantity");

cartBtn.addEventListener("click", () => {
  axios({
    method: "post",
    url: "/api/v1/products/cart",
    data: {
      id: id,
      name: names,
      quantity: quantity.value,
      price: productPrice.value,
    },
    headers: { Authorization: "Bearer ..." },
  });
  cartBtn.innerHTML = "Added to cart";
  setTimeout(() => {
    cartBtn.innerHTML = "Update cart";
  }, 4000);

});


