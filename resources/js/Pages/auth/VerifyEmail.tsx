import React from 'react';
import { usePage,useForm, Link } from '@inertiajs/react';


const VerifyEmail = () => {
    const { post } = useForm();
    const { auth } = usePage().props;

    const handleResend = () => {
        console.log(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'));

        post('/email/resend', {
            // headers: {
            //     'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
            // },
            // onSuccess(() => alert('Verification link sent!'))
            onSuccess: () => {
                alert('Verification link sent!');
            },
            onError: (err) => {
                console.error('Error:', err);
            },
        });
    };

            // .then(() => alert('Verification link sent!'))
            // .catch(() => alert('Failed to send verification link.'));
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Verify Your Email</h1>
                <p className="text-gray-600 text-center mb-6">
                    A verification link has been sent to your email: <strong>{auth?.user.email}</strong>.
                </p>
                <p className="text-gray-500 text-center mb-6">
                    Please verify your email to access the dashboard.
                </p>
                <div className="text-center">
                    <button
                        onClick={handleResend}
                        className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        Resend Verification Email
                    </button>
                </div>
                <p className="text-gray-500 text-xs text-center mt-6">
                    Didn’t receive the email? Make sure to check your spam folder.
                </p>

                <Link href="/" className=" text-primary text-xs text-center mt-6">
                    Go back to home page
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmail;
