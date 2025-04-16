import { useState, useEffect, createContext, useContext } from "react";

const ProductContext = createContext()

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cart')
        if (storedCartItems && storedCartItems != '[]') {
            return JSON.parse(storedCartItems)
        }
        return []
    });
    const [cartCount, setCartCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [checkoutPrice, setCheckoutPrice] = useState(0);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        let cartC = 0;
        cartItems.map((item) => {
            cartC += item[1]
        })
        setCartCount(cartC)
    }, [cartItems])

    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('cart')
    }

    const updateCheckoutDetails = () => {
        const totalPrice = cartItems.reduce(
            (total, [product, quantity]) => total + product.price * quantity,
            0
        );

        let newDiscount = 0;
        let newPlatformFee = 0;
        let newDeliveryCharge = 0;

        if (totalPrice > 1750) {
            newDiscount = totalPrice * 0.1;
            newPlatformFee = 6;
        } else if (totalPrice > 1000) {
            newDiscount = totalPrice * 0.07;
            newPlatformFee = 5;
            newDeliveryCharge = 1;
        } else if (totalPrice > 500) {
            newDiscount = totalPrice * 0.05;
            newPlatformFee = 4;
            newDeliveryCharge = 5;
        } else {
            newDiscount = totalPrice * 0.02;
            newPlatformFee = 3;
            newDeliveryCharge = 10;
        }

        const finalTotal = totalPrice - newDiscount + newPlatformFee + newDeliveryCharge;

        setPrice(totalPrice.toFixed(2));
        setDiscount(newDiscount.toFixed(2));
        setPlatformFee(newPlatformFee.toFixed(2));
        setDeliveryCharge(newDeliveryCharge.toFixed(2));
        setCheckoutPrice(finalTotal.toFixed(2));
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));

        let cartC = 0;
        cartItems.forEach((item) => {
            cartC += item[1];
        });
        setCartCount(cartC);

        updateCheckoutDetails();
    }, [cartItems]);


    const addToCart = (product) => {
        setCartItems(prev => [...prev, [product, 1]])
    }


    const removeFromCart = (product) => {
        setCartItems(prev => prev.filter(([prod]) => prod.id !== product.id))
    }

    const incrementQuantity = (product) => {
        setCartItems((prevItems) =>
            prevItems.map(([prod, quantity]) =>
                prod.id === product.id
                    ? [prod, quantity + 1]
                    : [prod, quantity]
            )
        );
    };

    const decrementQuantity = (product) => {
        setCartItems((prevItems) => {
            // If quantity is 1, remove it
            const targetItem = prevItems.find(([prod]) => prod.id === product.id);
            if (targetItem && targetItem[1] === 1) {
                return prevItems.filter(([prod]) => prod.id !== product.id);
            }

            // Otherwise, reduce quantity
            return prevItems.map(([prod, quantity]) =>
                prod.id === product.id
                    ? [prod, quantity - 1]
                    : [prod, quantity]
            );
        });
    };

    const isInCart = (productID) => {
        const targetItem = cartItems.find(([prod]) => prod.id === productID);
        if (targetItem) return [true, targetItem[1]];
        else return [false, 0];
    }

    const value = {
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        isInCart,
        checkoutPrice,
        price,
        discount,
        platformFee,
        deliveryCharge,
        clearCart
    }


    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
}