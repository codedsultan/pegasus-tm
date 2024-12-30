// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { FormInput, PageBreadcrumb, VerticalForm } from '../../components'
// // import { Link, Navigate } from 'react-router-dom'
// import { useForm, router, Link } from '@inertiajs/react';
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// //actions
// import { resetAuth, signupUser } from '../../redux/actions'
// import { RootState, AppDispatch } from '../../redux/store'
import AuthContainer from '../../components/AuthPageLayout/AuthContainer'
import AuthLayout from '../../components/AuthPageLayout/AuthLayout'
// import { route } from 'ziggy-js';
// import { useEffect } from 'react'
import { FormInput, PageBreadcrumb, VerticalForm } from '../../components'
import { useForm, Link } from '@inertiajs/react'
import * as yup from 'yup'
import { route } from 'ziggy-js'

interface UserData {
    first_name: string
    last_name: string
    email: string
    password: string
    accept_terms: boolean
}

const BottomLink = () => {
    return (
        <div className="text-center my-4">
            <p className="text-muted">
                Already have account?{' '}
                <Link href="/auth/login" className="text-muted ms-1 link-offset-3 underline underline-offset-4">
                    <b>Log In</b>
                </Link>
            </p>
        </div>
    )
}

const Register = () => {
    // Form validation schema
    const validationSchema = yup.object().shape({
        first_name: yup.string().required('Please enter First Name'),
        last_name: yup.string().required('Please enter Last Name'),
        email: yup.string().required('Please enter Email').email('Please enter valid Email'),
        password: yup.string().required('Please enter Password'),
        accept_terms: yup.boolean().oneOf([true], 'You must accept the terms').required()
    })

    const form = useForm<UserData>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        accept_terms: false
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        validationSchema.validate(form.data, { abortEarly: false })
        .then(() => {
            // If validation passes, submit the form
            form.post(route('register'), {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset()
                },
                onError: (errors: Record<string, string>) => {
                    // Directly set the error strings received from server
                    Object.keys(errors).forEach(key => {
                        form.setError(key as keyof UserData, errors[key])
                    })
                }
            })
        })
        .catch((validationError) => {
            // For client-side Yup validation errors, extract just the message
            if (validationError.inner) {
                validationError.inner.forEach((error: any) => {
                    form.setError(error.path as keyof UserData, error.message)
                })
            }
        })

    }

    const handleChange = (name: keyof UserData, value: any) => {
        console.log(name, value)
        form.setData(name, value)
        form.clearErrors(name)
    }

    return (
        <>
            <PageBreadcrumb title="Sign Up" />
            <AuthContainer>
                <AuthLayout
                    authTitle="Free Sign Up"
                    helpText="Don't have an account? Create your account, it takes less than a minute."
                    bottomLinks={<BottomLink />}
                >
                    <form onSubmit={handleSubmit}>

                    <div className="flex flex-col  sm:flex-row sm:space-x-4 ">
                        <FormInput
                            label="First Name"
                            type="text"
                            name="first_name"
                            value={form.data.first_name}
                            labelClassName="font-semibold text-gray-500"
                            placeholder="Enter your first name"
                            containerClass="mb-4 sm:mb-0 space-y-2 flex-1"
                            className="form-input"
                            onChange={(e) => handleChange('first_name', e.target.value)}
                            errors={{ first_name: form.errors.first_name }}
                        />
                        <FormInput
                            label="Last Name"
                            type="text"
                            name="last_name"
                            value={form.data.last_name}
                            labelClassName="font-semibold text-gray-500"
                            placeholder="Enter your last name"
                            containerClass="mb-4 sm:mb-0 space-y-2 flex-1"
                            className="form-input"
                            onChange={(e) => handleChange('last_name', e.target.value)}
                            errors={{ last_name: form.errors.last_name }}
                        />
                    </div>

                        <FormInput
                            label="Email address"
                            type="email"
                            name="email"
                            value={form.data.email}
                            labelClassName="font-semibold text-gray-500"
                            placeholder="Enter your email"
                            containerClass="mb-4 space-y-2"
                            className="form-input"
                            onChange={(e) => handleChange('email', e.target.value)}
                            errors={{
                                email: form.errors.email
                            }}
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={form.data.password}
                            labelClassName="font-semibold text-gray-500"
                            placeholder="Enter your password"
                            containerClass="mb-4 space-y-2"
                            className="form-input"
                            onChange={(e) => handleChange('password', e.target.value)}
                            errors={{password:form.errors.password}}
                        />

                        <div className="mb-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox rounded text-primary"
                                    id="checkbox-signin"
                                    checked={form.data.accept_terms}
                                    onChange={(e) => handleChange('accept_terms', e.target.checked)}
                                />
                                <label className="ms-2 font-semibold text-gray-600" htmlFor="checkbox-signin">
                                    I accept{' '}
                                    <Link href="#" className="text-gray-500">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                            {form.errors.accept_terms && (
                                <div className="text-red-500 text-sm mt-1">{form.errors.accept_terms}</div>
                            )}
                        </div>

                        <div className="text-center mb-4">
                            <button
                                className="btn bg-primary text-white"
                                type="submit"
                                disabled={form.processing}
                            >
                                {form.processing ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </AuthLayout>
            </AuthContainer>
        </>
    )
}

export default Register
