function Quantity({ quantity, onIncrement, onDecrement }) {
    return (
        <div className="flex items-center gap-4 border border-gray-300 rounded-full px-4 py-1 w-fit">
            <button
                className="text-xl font-bold text-gray-600 hover:text-black"
                onClick={onDecrement}
            >
                −
            </button>
            <p className="text-lg font-medium w-6 text-center">{quantity}</p>
            <button
                className="text-xl font-bold text-gray-600 hover:text-black"
                onClick={onIncrement}
            >
                +
            </button>
        </div>
    );
}

export default Quantity;
