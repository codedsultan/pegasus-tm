import { Link } from '@inertiajs/react';
const Home = ({ message }: { message: string }) => {
    return (

        // <div className="min-h-screen flex items-center justify-center">
        //     <h1 className="text-4xl font-bold text-blue-600">{message}</h1>
        // </div>
        // return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center">
                {/* Hero Section */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Welcome to Our Platform
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8">
                        Experience the best services for managing your tasks and achieving your goals.
                        Join us today and take the first step toward a better future.
                    </p>
                    <div className="flex justify-center space-x-4">
                        {/* Login Button */}
                        <Link
                            href="/login"
                            className="btn bg-primary text-white py-3 px-6 rounded-lg text-lg hover:bg-primary-dark transition"
                        >
                            Log In
                        </Link>
                        {/* Register Button */}
                        <Link
                            href="/register"
                            className="btn bg-secondary text-white py-3 px-6 rounded-lg text-lg hover:bg-secondary-dark transition"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-12 text-sm text-gray-500">
                    <p>
                        By signing up, you agree to our{' '}
                        <Link href="/terms" className="text-primary underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary underline">
                            Privacy Policy
                        </Link>.
                    </p>
                </div>
            </div>
        // );

    );
};

export default Home;
