import { useEffect, useState } from "react";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { getProducts } from "../services/api";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
            setLoading(false);
        };

        fetchProducts();
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-800 bg-clip-text text-transparent text-center py-8">
                Dummy Product Page by Burhanuddin!
            </h1>
            {loading ? (
                <Loading color={"text-blue-500"}/>
            ) : (
                <div className="sm:block flex justify-center items-center min-h-screen">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 items-stretch">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
