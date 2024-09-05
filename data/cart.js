export const cart=[];


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
        quantity:1
      });
    }
};
