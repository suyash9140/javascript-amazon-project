import { loadCart } from "../data/cart.js";
import {  loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js'

async function loadPage() {
  await loadProductsFetch();

  await new Promise((resolve)=>{
    loadCart(()=>{
    resolve();
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*

Promise.all([
 
 loadProductsFetch(),    
 new Promise((resolve)=>{
  loadCart(()=>{
  resolve();
  });
})

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
   loadProducts(()=>{
     resolve();
   });

}).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
    resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
