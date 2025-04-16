function NotFound() {
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl font-bold mb-5">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-7">Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="text-blue-600 hover:underline">Go back to Home</a>
        </div>
    );
}

export default NotFound;
