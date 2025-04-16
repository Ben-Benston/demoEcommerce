import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import successAnimation from '../lottie/orderPlaced.json'
import LottieOverlay from "../components/LottieOverlay";
import { useNavigate } from "react-router";

function OrderConfirm() {
    const {cartItems, checkoutPrice, clearCart } = useProductContext();
    const [isFormValid, setIsFormValid] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const navigate = useNavigate()

    if (!cartItems || cartItems.length === 0) {
        navigate('/');
    }


    const handleFormChange = (e) => {
        const form = e.target.form;
        let validity = false;

        const isValidPhone = form.phone.value.match(/^\d{10}$/);
        const isValidPin = form.pincode.value.match(/^\d{6}$/);

        if (form.checkValidity() && isValidPhone && isValidPin) {
            validity = true;
        }

        setIsFormValid(validity);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearCart()
        setShowAnimation(true)
    };

    return (
        <div className="flex justify-center">
            {showAnimation && (
                <LottieOverlay
                    animationData={successAnimation}
                    onComplete={() => { setShowAnimation(false); navigate('/') }}
                    size={400}
                />
            )}
            <form className="shadow-xl p-5 mt-10 rounded-lg w-xl" onSubmit={handleSubmit} onChange={handleFormChange}>
                <h2 className="text-center text-2xl font-bold">Confirm Your Order</h2>
                <p className="text-center text-lg font-semibold">Total: ${checkoutPrice}</p>

                <label className="font-medium mb-1">Full Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    className="inputField"
                    placeholder="Enter your full name"
                />

                <label className="font-medium mb-1">Contact Number</label>
                <input
                    type="text"
                    name="phone"
                    required
                    className="inputField"
                    placeholder="Enter your 10-digit contact number"
                />

                <label className="font-medium mb-1">Address</label>
                <textarea
                    type="text"
                    name="address"
                    required
                    className="inputField"
                    placeholder="Enter your address"
                />

                <label className="font-medium mb-1">City</label>
                <input
                    type="text"
                    name="city"
                    required
                    className="inputField"
                    placeholder="Enter city name"
                />

                <label className="font-medium mb-1">Pincode</label>
                <input
                    type="tel"
                    maxLength="6"
                    name="pincode"
                    required
                    className="inputField"
                    placeholder="Enter pincode"
                />
                <button
                    type="submit"
                    className={`bg-blue-600 text-white w-full p-2 rounded-md font-semibold transition mt-2 ${isFormValid ? "hover:bg-blue-700 cursor-pointer" : "opacity-50 cursor-not-allowed"
                        }`}
                    disabled={!isFormValid}
                >
                    Make Payment
                </button>

            </form>
        </div>
    );
}

export default OrderConfirm;
