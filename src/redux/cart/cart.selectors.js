import  { createSelector } from 'reselect';

// This prevents this specific piece of functionality from re-rendering any time other changes are made to the app.  

// Only grab the cart object.
const selectCart = state => state.cart;

// CreateSelector takes two arguments the array, and what you want to extract from the array
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => 
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);