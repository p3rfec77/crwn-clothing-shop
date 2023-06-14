import { createContext, useReducer } from "react";

import createAction from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => (
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
)

export const CartContext = createContext({
    isCartOpen: false,
    toggleIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    cartTotalSum: 0,
    removeItemFromCart: () => { },
    clearItemFromCart: () => { }
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotalSum: 0,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };

        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };

        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
};


export const CartProvider = ({ children }) => {

    const [{ isCartOpen, cartItems, cartCount, cartTotalSum }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    const toggleIsCartOpen = () => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, !isCartOpen));
    }


    const updateCarItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const NewCartTotalSum = newCartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotalSum: NewCartTotalSum
        })
        );
    }


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCarItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCarItemsReducer(newCartItems);

    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCarItemsReducer(newCartItems);
    }

    const value = {
        isCartOpen,
        toggleIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        cartTotalSum,
        removeItemFromCart,
        clearItemFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}