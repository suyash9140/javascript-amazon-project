import {cart, removeFromC,updateDelivery} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import { formatC } from '../utils/money.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js'
import { addOrder } from '../../data/orders.js';


export function renderPaymentSummary(params) {

  let productPrice=0;
  let deliveryPrice=0;
  cart.forEach((cartItem) => {
    
    let matchingProduct=getProduct(cartItem.productId);
    productPrice+=matchingProduct.priceCents*cartItem.quantity;
    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
    deliveryPrice+=deliveryOption.priceCents;
  });
  const totalBeforeTax=productPrice+deliveryPrice;
  const taxCents=totalBeforeTax*.01;
  const totalAfterTax=totalBeforeTax+taxCents;

  const paymentsummaryHTML=`  
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatC(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatC(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatC(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatC(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatC(totalAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;

document.querySelector('.js-payment-summary').innerHTML=paymentsummaryHTML;

document.querySelector('.js-place-order').addEventListener('click',async ()=>{
  try{
    const response=await fetch('https://supersimplebackend.dev/orders',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
         cart:cart
      })
     });
   
     const order=await response.json();
     addOrder(order);

  }catch(error){
     console.log('Unexpected error. Try again later.');
  }

  window.location.href='orders.html';
   
   
});
  
}