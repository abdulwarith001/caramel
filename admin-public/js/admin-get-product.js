const productWrapper = document.getElementById("productWrapper");
const total = document.getElementById("total");
const deleteBtn = document.querySelector(".deleteBtn");
const errDOM = document.getElementById('msg')
const userDOM = document.getElementById('user')
const url = `/api/v1/products/`;
const getAllProducts = async () => {
  try {
     errDOM.innerHTML = "Loading..."
    errDOM.classList.add('sucess')
    errDOM.classList.remove('danger')
      const token = localStorage.getItem('token')
  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const products = data.data;
    const totalResponse = data.total_Product;
    userDOM.innerHTML = data.username
  total.innerHTML = totalResponse;
  if (products.length < 1) {
    return productWrapper.innerHTML = "No products found";
  }
  const allProducts = products.map((product) => {
    return `<div class="product">
            <img src="/${product.image}" alt="" class="pImg">
            <p>${product.name}</p>
            <p class="price"><i class="fa-solid fa-naira-sign icon"></i>${product.price.toLocaleString(
              "en-US"
            )}</p>
            <button class="btn-inverse-info btn-md btn-icon-append"><a href="admin-edit.html?id=${product._id}">Edit<i class="fa-solid fa-pen-to-square"></i></a></button>
            <button class="btn-inverse-danger btn-md btn-icon-append deleteBtn" data-id="${product._id}" onclick="deleteProduct(this)">Delete<i class="fa-solid fa-trash"></i></button>
        </div>`;
  });

    errDOM.innerHTML = ''
    errDOM.classList.remove('sucess')

  productWrapper.innerHTML = allProducts
  } catch (error) {
    errDOM.innerHTML = "Oops, something went wrong."
    errDOM.classList.add('danger')
    errDOM.classList.remove('sucess')
  }
};

getAllProducts();

async function deleteProduct(e) {
  const id = e.dataset.id;
  const token = localStorage.getItem("token");
    try {
      await axios.delete(`${url}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getAllProducts()
      errDOM.innerHTML = 'Product deleted successfully...'
       errDOM.classList.remove("danger");
       errDOM.classList.add("sucess");
      setTimeout(() => {
        errDOM.innerHTML = ''
        errDOM.classList.remove('sucess')
      }, 2000)
    } catch (error) {
      errDOM.innerHTML = "Something went wrong.";
      errDOM.classList.add("danger");
      errDOM.classList.remove("sucess");
    }
}

const logoutDOM = document.getElementById("logout");
const logout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
    window.location = "/admin";
  }
};

logoutDOM.addEventListener("click", logout);