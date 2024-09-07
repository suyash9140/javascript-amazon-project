import {getProduct, loadProductsFetch} from '../data/products.js';
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatC} from './utils/money.js';

async function loadPage() {
  

  await loadProductsFetch();

  const url=new URL(window.location.href);
        
  const orderID=url.searchParams.get('orderId');
  const productID=url.searchParams.get('productId');

  let matchingOrder;
  orders.forEach(order => {
      
      if(orderID===order.id){
        matchingOrder=order;
      }
  });
  console.log(matchingOrder);



  const time=dayjs(matchingOrder.orderTime).format('dddd, MMMM D');
  const product = getProduct(productID);
  console.log(product);


  let trackingHTML=`
  <div class="order-tracking ">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${time}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${product.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
  `;

  document.querySelector('.js-main').innerHTML=trackingHTML;


}

loadPage();



