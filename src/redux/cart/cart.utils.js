export const addItemToCart = (cartItems, cartItemToAdd) => {
  //cartItems starts as an empty array and it will fill with objects
  //search for an item in the existing array of cartItems with the same id as the id of cardItemToAdd
  //when we add the first item to the array this returns undefined
  //find method returns the item if it finds it else it returns undefined
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  //this block executes after the cartItems array has at least one item
  //add one to the quantity of the product
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  //this return runs only the first time we add an item to the array
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  //if quantity is one we use again the code we used for remove an item from the array of items
  //filter keeps the values where the function returns true
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  //if quantity is not one
  //map every item to itself except for the case where we have the cart item to remove, where we decrease its quantity field by one
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};
