import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthContainer from '../../components/AuthPageLayout/AuthContainer';
import AuthLayout from '../../components/AuthPageLayout/AuthLayout';
import { FormInput } from '../../components';

interface UserData {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

const ResetPassword = () => {
    const { data, setData, post, processing, errors } = useForm<UserData>({
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
    });

    useEffect(() => {
        // Parse the URL to get the token and email
        const url = new URL(window.location.href);
        const token = url.pathname.split('/').pop() || ''; // Get the token from the path
        const email = url.searchParams.get('email') || ''; // Get the email from the query string

        // Update form data
        setData('token', token);
        setData('email', email);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/reset-password', {
            onSuccess: () => {
                alert('Password reset successful.');
            },
            onError: (err) => {
                console.error('Error:', err);
            },
        });
    };

    return (
        <AuthContainer>
            <AuthLayout authTitle="Reset Password" helpText="Please enter your new password.">
                <form onSubmit={handleSubmit}>
                    {/* <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter your email"
                        containerClass="mb-6 space-y-2"
                        className="form-input"
                        required
                        errors={errors.email}
                    /> */}
                    <FormInput
                        label="New Password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Enter your new password"
                        containerClass="mb-6 space-y-2"
                        className="form-input"
                        required
                        errors={errors.password}
                    />
                    <FormInput
                        label="Confirm Password"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="Confirm your new password"
                        containerClass="mb-6 space-y-2"
                        className="form-input"
                        required
                        errors={errors.password_confirmation}
                    />
                    {/* Hidden token input */}
                    <input type="hidden" name="token" value={data.token} />
                    <input type="hidden" name="email" value={data.email} />
                    <div className="text-center">
                        <button className="btn bg-primary text-white" type="submit" disabled={processing}>
                            Reset Password
                        </button>
                    </div>
                </form>
            </AuthLayout>
        </AuthContainer>
    );
};

export default ResetPassword;
