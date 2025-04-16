import { useEffect } from "react";
import CartProduct from "../components/CartProduct";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router";

function Cart() {
    const {
        cartItems,
        checkoutPrice,
        price,
        discount,
        platformFee,
        deliveryCharge,
    } = useProductContext();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Your Cart - Burhan";
    }, []);

    const checkout = () => {
        navigate("/payment");
    };

    return (
        <div className="px-4 py-6 max-w-7xl mx-auto">
            {cartItems.length > 0 ? (
                <>
                    <h2 className="text-3xl font-semibold mb-6 text-center">
                        Shopping Cart
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <CartProduct key={index} product={item[0]} />
                            ))}
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 shadow-md h-fit text-gray-700 text-lg">
                            <h3 className="text-xl font-semibold mb-4 text-black">
                                Order Summary
                            </h3>
                            <hr className="w-full border-gray-400" />

                            <div className="mt-5 flex justify-between">
                                <p>Items:</p>
                                <p>{cartItems.reduce((sum, item) => sum + item[1], 0)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Price:</p>
                                <p>${price}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount:</p>
                                <p className="text-green-500 font-bold">−${discount}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Platform Fee:</p>
                                <p>${platformFee}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Delivery Charge:</p>
                                <p>${deliveryCharge}</p>
                            </div>

                            <hr className="mt-5 w-full border-gray-400" />
                            <div className="mt-5 flex justify-between text-xl font-bold text-black">
                                <p>Total Amount:</p>
                                <p>${checkoutPrice}</p>
                            </div>
                            <hr className="mt-5 w-full border-gray-400" />

                            <button
                                className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={checkout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-gray-600 text-center text-2xl font-bold mt-10">Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
