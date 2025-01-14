import { Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../components/AuthPageLayout/AuthLayout';
import AuthContainer from '../../components/AuthPageLayout/AuthContainer';
import VerticalForm from '../../components/VerticalForm';
import FormInput from '../../components/FormInput';

/**
 * Bottom Links component
 */
const BottomLink = () => {
    return (
        <div className="text-center my-4">
            {/* <p className="text-muted">
                Don&apos;t have an account?&nbsp;
                <Link href="/register" className="text-muted ms-1 link-offset-3 underline underline-offset-4">
                    <b>Sign Up</b>
                </Link>
            </p> */}
        </div>
    );
};

const PasswordInputChild = () => {
    return (
        <Link href="/forgot-password" className="text-muted text-xs underline decoration-dashed underline-offset-4">
            Forgot your password?
        </Link>
    );
};

const Login = ({ errors }: { errors: Record<string, string> }) => {
    const { data, setData, post, processing } = useForm({
        username: '',
        password: '',
    });

    /*
      form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required('Please enter Username'),
            password: yup.string().required('Please enter Password'),
        })
    );

    /*
      handle form submission
    */
    const onSubmit = () => {
        post('/admin/login', {
            data: {
                username: data.username,
                password: data.password,
            },
            onSuccess: () => {
                const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/admin/dashboard';
                router.visit(redirectUrl); // Redirect to the desired page after login
            },
            onError: (errors) => {
                console.log(errors); // Optional: Log errors for debugging
            }
        });
    };

    return (
        <AuthContainer>
            <AuthLayout
                authTitle="Sign In"
                helpText="Enter your email address and password to access the admin panel."
                bottomLinks={<BottomLink />}
            >
                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{
                        username: '',
                        password: '',
                    }}
                >
                    <FormInput
                        label="Email Address"
                        type="email"
                        name="username"
                        value={data?.username}
                        onChange={(e) => setData('username', e.target?.value)}
                        className="form-input"
                        placeholder="Enter your email"
                        containerClass="mb-6 space-y-2"
                        labelClassName="font-semibold text-gray-500"
                        required
                        errors={errors?.username}
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={data?.password}
                        onChange={(e) => setData('password', e.target?.value)}
                        placeholder="Enter your password"
                        className="form-input rounded-e-none"
                        containerClass="mb-6 space-y-2"
                        labelClassName="font-semibold text-gray-500"
                        labelContainerClassName="flex justify-between items-center mb-2"
                        required
                        errors={errors?.password}
                    >
                        <PasswordInputChild />
                    </FormInput>

                    <FormInput
                        label="Remember me"
                        type="checkbox"
                        name="checkbox"
                        className="form-checkbox rounded text-primary"
                        containerClass="mb-6"
                        labelClassName="ms-2"
                        defaultChecked
                    />

                    <div className="text-center mb-6">
                        <button className="btn bg-primary text-white" type="submit" disabled={processing}>
                            Log In
                        </button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </AuthContainer>
    );
};

export default Login;
