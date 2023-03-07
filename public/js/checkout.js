
//transfer info toggle
const transferInfo = document.getElementById("transferInfo");
const cardInfo = document.getElementById("cardInfo");
const transferBtn = document.getElementById("transfer");
const cardBtn = document.getElementById("card");

function toggleTransferInfo() {
  if (transferBtn.checked) {
    transferInfo.style.display = "block";
    cardInfo.style.display = "none";
  } else {
    if (cardBtn.checked) {
      transferInfo.style.display = "none";
      cardInfo.style.display = "block";
    }
  }
}
transferBtn.addEventListener("click", toggleTransferInfo);
cardBtn.addEventListener("click", toggleTransferInfo);
toggleTransferInfo()


//form validation
const errMsgDisplay = document.getElementById("errMsg");
const form = document.getElementById("form");
const errorwrapper = document.getElementById("errorWrapper");

//billing selectors
const fullname = document.querySelector("#fullname");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const phone = document.querySelector("#phone");
const state = document.querySelector("#state");
const zip = document.querySelector("#zip");
//shipping selectors
// const shipping_fname = document.querySelector("#shipping-fname");
// const shipping_lname = document.querySelector("#shipping-lname");
// const shipping_addr = document.querySelector("#shipping-addr");
// const shipping_town = document.querySelector("#shipping-town");
// const loader = document.getElementById('postLoader')

//t and c selector
// const tAndc = document.querySelector("#termsAndconditions");

form.addEventListener("submit", (e) => {
  const errArr = [];
  errorwrapper.style.display = "inline-flex";
  errMsgDisplay.innerHTML = "";

  if (fullname.value === "") {
    errArr.push("Full name");
    fullname.style.border = '1px solid red'
  }

  if (address.value === "") {
    errArr.push("Address");
    address.style.border = '1px solid red'

  }

  if(phone.value === ''){
    errArr.push('Phone number')
    phone.style.border = '1px solid red'
  }

  if(city.value === ''){
       errArr.push("Billing Town / City");
    city.style.border = '1px solid red'
  }
  if(state.value === ''){
       errArr.push("State input");
    state.style.border = '1px solid red'
  }
  if(zip.value === ''){
       errArr.push("Zipcode");
    zip.style.border = '1px solid red'
  }

   if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))){
     errArr.push('Valid e-mail');
     email.style.border = '1px solid red'
    }

  

      //checks if the other shipping is checked or not and then runs validation on it
      // if(otherShipping.checked){
      //   if(shipping_fname.value === ''){
      //     errArr.push('Shipping First name')
      //     shipping_fname.style.border = '1px solid red'
      //   }
      //   if(shipping_lname.value === ''){
      //     errArr.push('Shipping Last name')
      //     shipping_lname.style.border = '1px solid red'
      //   }
      //   if(shipping_addr.value === ''){
      //     errArr.push('Shipping Street Address')
      //     shipping_addr.style.border = '1px solid red'
      //   }
      //   if(shipping_town.value === ''){
      //     errArr.push('Shipping Town / City')
      //     shipping_town.style.border = '1px solid red'
      //   }
      // }

    //   if(!(tAndc.checked)){
    //     errArr.push('Pls read the terms and conditions before proceeding')
    //   }

  errArr.forEach((msg) => {
    let p = document.createElement("p");
    p.innerHTML = `<strong>${msg}</strong> is required`;
    if(msg === 'Pls read the terms and conditions before proceeding'){
      p.innerHTML = msg
    }
    errMsgDisplay.append(p);
  });

  if (errArr.length >= 1) {
    e.preventDefault();
  } else {
    loader.classList.add('showLoader')
    loader.classList.remove('hide')
  }

  window.scrollTo(0, 0);
});

const cartWrapper = document.getElementById("cartProductWrapper");
const total = document.getElementById("total");
let totalNum = 0;

async function getCartProducts() {
  cartWrapper.innerHTML = "";
  const { data: response } = await axios.get("/api/v1/products/cart/all-cart");
  if (response.length === 0) {
    cartWrapper.innerHTML =
      '<div class="productWrapper">No products in cart...</div>';
    return;
  }

  const res = response.map(async (r) => {
    const { data: re } = await axios.get("/api/v1/products/cartValues/" + r);
    const txt = `<tr class="rrr">
            <th scope="row">${re.name}</th>
            <td>
            <i class="fa-solid fa-naira-sign icon"></i>${re.price}</td>
            <td>${re.quantity}</td>
            <td><i class="fa-solid fa-naira-sign icon"></i>${(
              re.price * re.quantity
            ).toLocaleString("en-US")}</td>
          <td>
</td>
          </tr>`;
    cartWrapper.insertAdjacentHTML("beforeend", txt);
    totalNum += Number(re.price * re.quantity);
    total.value = `${totalNum}`;
    // console.log(re);
    // addTotal();
    // addSubtotal();
  });
}

getCartProducts();

