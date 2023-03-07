const productContainer = document.getElementById("productContainer");

const getAllProducts = async () => {
  const { data } = await axios.get("/api/v1/products/allProducts");
  const products = data.data;
  const allProducts = products.map((product) => {
    return ` <div class="card col-lg-3 col-md-4 col-6">
            <img class="img-fluid img-thumbnail tr" src="/${
              product.image
            }" alt="Capsule">
         <h5 class="sd">${product.name}</h5>
            <p class="price"><i class="fa-solid fa-naira-sign icon"></i>${product.price}</p>
            <a id="pas" onclick="addToCart(${product._id}, ${product.name}, ${
      product.price
    })" href="product-detail.html?key=${product._id}&name=${
      product.name
    }" data-name="Orange" data-price="0.5" class="add-to-cart bg-primary" >see more</a>
            </div>`;
  });

  productContainer.innerHTML = allProducts.join(' ');
};

getAllProducts();

