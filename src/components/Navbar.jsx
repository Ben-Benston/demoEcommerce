import { IoLogoAmazon, IoCart } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useProductContext } from "../context/ProductContext";

function Navbar() {
    const { cartCount } = useProductContext()

    return (
        <nav className="sticky top-0 z-50 bg-blue-600 flex justify-between p-3 text-4xl text-white xl:text-5xl">
            <a href="/">
                <IoLogoAmazon className="enlarge" />
            </a>
            <div className="flex gap-4 items-center">
                <a href="/account" className="enlarge">
                    <MdAccountCircle />                
                </a>
                <a className="relative enlarge" href="/cart">
                    <IoCart />
                    {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white">
                        {cartCount}
                    </span>
                    }
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
