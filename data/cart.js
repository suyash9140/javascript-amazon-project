export let cart;
loadFromStorage();

export function loadFromStorage(params) {
  cart=JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart=[{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'2'
    }];
  }
}


function saveToS(params) {
   localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId) {
  let matchItem;
      cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchItem=cartItem;
        }
      });

      if(matchItem){
        matchItem.quantity++;
      }
      else{
      cart.push({
        productId: productId,
        quantity:1,
        deliveryOptionId:'1'
      });
    }
   saveToS();
}

export function removeFromC(productId) {
  const newCart=[];
  cart.forEach((cartItem)=>{
     if(cartItem.productId!==productId){
      newCart.push(cartItem);
     }
  });
  cart=newCart;
  saveToS();
}

export function updateDelivery(productId, deliveryOptionId){
  let matchItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
        matchItem=cartItem;
    }
  });
  matchItem.deliveryOptionId=deliveryOptionId;
  saveToS();
}


export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',()=>{
    
    fun();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
  
}
