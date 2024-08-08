const express = require("express");
let cors = require('cors');
const app = express();
let PORT = 3000;


app.use(cors());

//cart data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

//functions
function addProductToCart(cart, productId, name, price, quantity){
  let product = {productId, name, price, quantity};
  cart.push(product);
  return cart;
}

function updateProductById(cart, productId, quantity){
  for(let i = 0; i < cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

function deleteProduct(cart, productId){
  return cart.filter(ele => ele.productId !== productId);
}

function findTotalQuantity(cart){
  let quantity = 0;
  for(let i = 0; i < cart.length; i++){
    quantity = cart[i].quantity + quantity;
  }
  return quantity;
}

function calculateTotalPrice(cart){
  let totalPrice = 0;
  for(let i = 0; i < cart.length; i++){
    totalPrice = cart[i].price * cart[i].quantity + totalPrice;
  }
  return totalPrice;
}

//endpoints
//cart/add
app.get("/cart/add", (req, res) =>{
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addProductToCart(cart, productId, name, price, quantity);
  res.json({cartItems : result }); 
})

//cart/edit
app.get("/cart/edit", (req, res) =>{
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateProductById(cart, productId, quantity);
  res.json({cartItems : result });
})

//cart/delete
app.get("/cart/delete", (req, res) =>{
  let productId = parseInt(req.query.productId);
  let result = deleteProduct(cart, productId);
  res.json({cartItems : result });
})

//cart
app.get("/cart", (req, res) =>{
  res.json({cartItems : cart });
})

//cart/total-quantity
app.get("/cart/total-quantity", (req, res) =>{
  let totalQuantity = findTotalQuantity(cart);
  res.json({totalQuantity : totalQuantity });
})

//cart/total-price
app.get("/cart/total-price", (req, res) =>{
  let totalPrice = calculateTotalPrice(cart);
  res.json({totalPrice : totalPrice})
})


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});