export const addItemToCart = (cartItems, cartItemToAdd) => {
  // loop through existing cart items.  The Find method will return the first matching item, given the condition.  If it doen't find a match, existingCartItem will return undefined
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if(existingCartItem) {
    // We need to return a new array, hence map, if the cartItem to add exists add a quantity to it, otherwise just return the cartItem
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id 
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }
  // If this is a new item, return the cartItems array with the cartItemToAdd and assign it a quantity property of 1.  This will allow future access to the quantity property.
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}