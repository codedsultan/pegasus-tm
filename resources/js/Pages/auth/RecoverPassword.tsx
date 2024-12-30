import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Components
import AuthContainer from '../../components/AuthPageLayout/AuthContainer';
import AuthLayout from '../../components/AuthPageLayout/AuthLayout';
import { FormInput, PageBreadcrumb, VerticalForm } from '../../components';

interface UserData {
    username: string;
}

const BottomLink = () => {
    return (
        <div className="text-center my-4">
            <p className="text-muted">
                Back to{' '}
                <Link href="/auth/login" className="text-muted ms-1 link-offset-3 underline underline-offset-4">
                    <b>Log In</b>
                </Link>
            </p>
        </div>
    );
};

const RecoverPassword = () => {
    const { data, setData, post, processing, errors } = useForm<UserData>({
        username: '',
    });

    /*
     * Form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().email('Please enter a valid email').required('Please enter email'),
        })
    );

    /*
     * Handle form submission
     */
    const onSubmit = () => {
        post('/forgot-password', {
            data: { username: data.username },
            onSuccess: () => {
                alert('Password reset instructions have been sent to your email.');
            },
            onError: (err) => {
                console.error('Error:', err);
            },
        });
    };

    return (
        <>
            <PageBreadcrumb title="Recover Password" />
            <AuthContainer>
                <AuthLayout
                    authTitle="Reset Password"
                    helpText="Enter your email address and we'll send you an email with instructions to reset your password."
                    bottomLinks={<BottomLink />}
                >
                    <VerticalForm<UserData>
                        onSubmit={onSubmit}
                        resolver={schemaResolver}
                        defaultValues={{
                            username: '',
                        }}
                    >
                        <FormInput
                            label="Email Address"
                            type="email"
                            name="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Enter your email"
                            containerClass="mb-6 space-y-2"
                            className="form-input"
                            required
                            errors={errors.username}
                        />
                        <div className="text-center">
                            <button className="btn bg-primary text-white" type="submit" disabled={processing}>
                                <i className="ri-login-box-line me-1"></i> Reset Password{' '}
                            </button>
                        </div>
                    </VerticalForm>
                </AuthLayout>
            </AuthContainer>
        </>
    );
};

export default RecoverPassword;
