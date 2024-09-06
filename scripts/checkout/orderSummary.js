import {cart, removeFromC,updateDelivery} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { formatC } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'



 export function renderOrderSummary(){

  let cartSummary='';

  cart.forEach((cartItem) =>{
    
    const productId =cartItem.productId;
    const matchingProduct=getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    let deliveryOption=getDeliveryOption(deliveryOptionId);
    
    
      const today=dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

    

    cartSummary +=

    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        $${formatC(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>`;
  });



  function deliveryOptionsHTML(matchingProduct,cartItem){
    let deliveryHTML = '';
      deliveryOptions.forEach((deliveryOption)=>{

        const today=dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents===0 ? 'FREE' : `$${formatC(deliveryOption.priceCents)} -`;
        const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
        deliveryHTML+=
        `<div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-id="${deliveryOption.id}">
          <input type="radio" ${ischecked ? 'checked': ''}
            class="delivery-option-input"
            name="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`
      });
      return deliveryHTML;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummary;

  document.querySelectorAll('.js-delete-link').
  forEach((link) => {
    
    link.addEventListener('click', ()=>{
      const productId=link.dataset.productId;
      
      removeFromC(productId);
      console.log(cart);
      
      const cont =document.querySelector(`.js-cart-item-container-${productId}`);
      console.log(cont);
      cont.remove();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryId;
    updateDelivery(productId,deliveryOptionId);
    renderOrderSummary;
    });
  });
};
