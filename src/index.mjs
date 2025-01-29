import "./styles.css";
const app = document.getElementById("app");
app.innerHTML = `
<h1>Hello JavaScript!</h1>
`;

console.log("promise creation");
const cart = ["rohit"];
let originalBal = "$80M";
createOrder(cart)
  .then((orderId) => {
    console.log(orderId);
    return orderId;
  })
  .catch(function (err) {
    console.log(err.message);
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (message) {
    console.log(message);
    return message;
  })
  .then(function (message) {
    return updateWalletBalance(message.price);
  })
  .then(function (remBal) {
    console.log(remBal);
  })
  .catch((err) => console.log(err.message));

function createOrder(cart) {
  return new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Cart not validated");
      reject(err);
    } else {
      const orderId = "1234";
      setTimeout(function () {
        resolve(orderId);
      }, 5000);
    }
  });
}
function validateCart(cart) {
  if (cart.length > 0) return true;
  return false;
}
function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    if (orderId) {
      setInterval(function () {
        resolve({ message: "payment Successful", price: "$50M" });
      }, 5000);
    }
  });
}

// the only thing that matters in the arguments of function inside promise is the placement
// If you interchange the positions of resolve and reject, resolve will work as reject and reject will work as resolve
// first argument will always act as resolve and second as reject
function updateWalletBalance(spentMoney) {
  return new Promise(function (reject, resolve) {
    spentMoney = parseInt(spentMoney.match(/\d+/));
    originalBal = parseInt(originalBal.match(/\d+/));
    console.log(originalBal);
    if (spentMoney <= originalBal) {
      console.log("payment possible");
      let remBal = originalBal - spentMoney;
      setTimeout(function () {
        reject(remBal);
      }, 5000);
    } else {
      const err = new Error("Not enough balance in wallet");
      resolve(err);
    }
  });
}
