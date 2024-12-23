const Home = ({ message }: { message: string }) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-600">{message}</h1>
        </div>
    );
};

export default Home;
