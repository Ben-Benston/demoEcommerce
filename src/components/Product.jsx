import { TbShoppingCartPlus } from "react-icons/tb";
import Quantity from "./Quantity";
import { useProductContext } from "../context/ProductContext";
import { useState } from "react";
import LottieOverlay from "./LottieOverlay";
import successAnimation from '../lottie/addToCart.json'

function Product({ product }) {
    const { incrementQuantity, decrementQuantity, isInCart, addToCart } =
        useProductContext();

    const [inCart, quantity] = isInCart(product.id);

    const [showAnimation, setShowAnimation] = useState(false);

    return (
        <div className="w-full max-w-xs border-2 border-gray-200 rounded-3xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3">
            {showAnimation && (
                <LottieOverlay
                    animationData={successAnimation}
                    onComplete={() => setShowAnimation(false)}
                    size={200}
                />
            )}
            <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mx-auto"
            />
            <p className="font-semibold text-sm line-clamp-2">
                {product.title}
            </p>
            <p className="text-sm text-gray-600">
                ⭐ {product.rating.rate} ({product.rating.count})
            </p>
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg">${product.price}</p>

                {inCart ? (
                    <Quantity
                        quantity={quantity}
                        onIncrement={() => incrementQuantity(product)}
                        onDecrement={() => decrementQuantity(product)}
                    />
                ) : (
                    <button
                        className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
                        onClick={() => {addToCart(product);setShowAnimation(true)}}
                    >
                        <TbShoppingCartPlus />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Product;
