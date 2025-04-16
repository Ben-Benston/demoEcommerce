import Quantity from "./Quantity";
import { useProductContext } from "../context/ProductContext";

function CartProduct({ product }) {
    const { incrementQuantity, decrementQuantity, isInCart } = useProductContext();
    const [inCart, quantity] = isInCart(product.id);

    return (
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 flex gap-6">
            <div className="flex flex-col items-center gap-3">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-36 w-28 object-contain"
                />
                <Quantity
                    quantity={quantity}
                    onIncrement={() => incrementQuantity(product)}
                    onDecrement={() => decrementQuantity(product)}
                />
            </div>

            <div className="flex flex-col justify-between flex-1">
                <div>
                    <p className="text-lg font-medium mb-2 line-clamp-2">
                        {product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                        ⭐ {product.rating.rate} ({product.rating.count})
                    </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-semibold text-gray-800">${product.price}</p>
                    <p className="text-sm text-gray-500">x {quantity}</p>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;
