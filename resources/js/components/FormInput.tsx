import { useState, InputHTMLAttributes, ReactNode } from 'react'

import { FieldErrors, Control } from 'react-hook-form'


interface PasswordInputProps {
    name: string
    placeholder?: string
    refCallback?: any
    errors: FieldErrors
    control?: Control<any>
    register?: any
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void  // Add onChange prop
    value?: string  // Add value prop
}
// Add helper function to get error message
const getErrorMessage = (error: any): string => {
    if (!error) return ''
    if (typeof error === 'string') return error
    if (error.message) return error.message
    return ''
}
/* Password Input */
const PasswordInput = ({
    name,
    placeholder,
    refCallback,
    errors,
    register,
    className,
    onChange,  // Add onChange to props
    value      // Add value to props
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const errorMessage = errors && errors[name] ? getErrorMessage(errors[name]) : ''    // Get error message from errors object
    // Create handler that calls both register onChange and custom onChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (register && register(name).onChange) {
            register(name).onChange(e)
        }
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <>
            <div className="flex items-center">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    value={value}
                    ref={(r: HTMLInputElement) => {
                        if (refCallback) refCallback(r)
                        if (register && register(name).ref) {
                            register(name).ref(r)
                        }
                    }}
                    className={`${className} ${errorMessage ? 'border-red-500 text-red-700 -me-px' : ''}`}
                    // className={`${className} ${errors && errors[name] ? 'border-red-500 text-red-700 -me-px' : ''}`}
                    onChange={handleChange}
                    autoComplete={name}
                />
                <span
                    className="px-3 py-1 border rounded-e-md -ms-px dark:border-white/10"
                    onClick={() => {
                        setShowPassword(!showPassword)
                    }}
                >
                    <i className={`${showPassword ? 'ri-eye-close-line' : 'ri-eye-line'} text-lg`}></i>
                </span>
            </div>
        </>
    )
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    type?: string
    name: string
    placeholder?: string
    register?: any
    errors?: any
    control?: Control<any>
    className?: string
    labelContainerClassName?: string
    labelClassName?: string
    containerClass?: string
    refCallback?: any
    children?: ReactNode
    rows?: number
    value?: any  // Add value prop
    // error?: string  // Add error prop
}

const FormInput = ({
    label,
    type,
    name,
    placeholder,
    register,
    errors,
    className,
    labelClassName,
    labelContainerClassName,
    containerClass,
    refCallback,
    children,
    rows,
    onChange,  // Get onChange from props
    value,     // Get value from props
    ...otherProps
}: FormInputProps) => {
    const errorMessage = errors && errors[name] ? getErrorMessage(errors[name]) : ''

    const Tag = type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input'
    return (
        <>
            {type === 'hidden' ? (
                <input type={type} name={name} {...(register ? register(name) : {})} {...otherProps} />
            ) : (
                <>
                    {type === 'password' ? (
                        <>
                            <div className={containerClass ?? ''}>
                                {label && (
                                    <div className={labelContainerClassName ?? ''}>
                                        <label className={labelClassName ?? ''} htmlFor={name}>
                                            {label}
                                        </label>
                                        {children}
                                    </div>
                                )}
                                <PasswordInput
                                    name={name}
                                    placeholder={placeholder}
                                    refCallback={refCallback}
                                    errors={errors}
                                    register={register}
                                    className={className}
                                    onChange={onChange}  // Pass onChange to PasswordInput
                                    value={value}       // Pass value to PasswordInput
                                />
                                {/* {errors && errors[name] && (
                                    <>
                                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                            <i className="mgc_warning_fill text-xl text-red-500" />
                                        </div>
                                        <p className="text-xs text-red-600 mt-2"> {errors[name]['message']}</p>
                                    </>
                                )} */}

                                {errorMessage && (
                                    <>
                                        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                            <i className="mgc_warning_fill text-xl text-red-500" />
                                        </div>
                                        <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
						<>
							{type === 'textarea' ? (
								<>
									<div className={`${containerClass ?? ''} relative`}>
										{label ? (
											<label className={labelClassName ?? ''} htmlFor={name}>
												{label}
											</label>
										) : null}
										<Tag
											placeholder={placeholder}
											name={name}
											id={name}
											rows={rows}
											ref={(r: HTMLInputElement) => {
												if (refCallback) refCallback(r)
											}}
											className={`${className} ${errors && errors[name] ? 'border-red-500 focus:border-red-500 text-red-700  pe-10' : ''}`}
											{...(register ? register(name) : {})}
											{...otherProps}
											autoComplete={name}
                                            onChange={onChange}  // Pass onChange to PasswordInput
                                            value={value}
										/>
									</div>
								</>
							) : (
								<>
									{type === 'select' ? (
										<>
											<div className={`${containerClass ?? ''} relative`}>
												{label && (
													<label className={labelClassName ?? ''} htmlFor={name}>
														{label}
													</label>
												)}
												<Tag
													name={name}
													id={name}
													ref={(r: HTMLSelectElement) => {
														if (refCallback) refCallback(r)
													}}
													className={className}
													{...(register ? register(name) : {})}
													{...otherProps}
													autoComplete={name}
                                                    onChange={onChange}  // Pass onChange to PasswordInput
                                                    value={value}
												>
													{children}
												</Tag>
											</div>
										</>
									) : (
										<>
											{type === 'checkbox' || type === 'radio' ? (
												<>
													<div className={containerClass ?? ''}>
														<div className="flex items-center">
															<input
																type={type}
																name={name}
																id={name}
																ref={(r: HTMLInputElement) => {
																	if (refCallback) refCallback(r)
																}}
																className={`${className} ${errors && errors[name] ? 'border-red-500 focus:border-red-500 text-red-700  pe-10' : ''}`}
																{...(register ? register(name) : {})}
																{...otherProps}
                                                                onChange={onChange}  // Pass onChange to PasswordInput
                                                                value={value}
															/>
															<label className={labelClassName ?? ''} htmlFor={name}>
																{label}
															</label>
														</div>
													</div>
												</>
											) : (
												<>
													<div className={containerClass ?? ''}>
														{label && (
															<label className={labelClassName ?? ''} htmlFor={name}>
																{label}
															</label>
														)}
														<div className="relative">
															<input
																type={type}
																placeholder={placeholder}
																name={name}
																id={name}
																ref={(r: HTMLInputElement) => {
																	if (refCallback) refCallback(r)
																}}
																className={`${className} ${errors && errors[name] ? 'border-red-500 focus:border-red-500 text-red-700  pe-10' : ''}`}
																{...(register ? register(name) : {})}
																{...otherProps}
																autoComplete={name}
                                                                onChange={onChange}  // Pass onChange to PasswordInput
                                                                value={value}
															/>
															{/* {errors && errors[name] && (
																<div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
																	<i className="ri-error-warning-fill text-xl text-red-500" />
																</div>
															)}
														</div>
														{errors && errors[name] && <p className="text-xs text-red-600 mt-2">{errors[name]['message']}</p>}
														{children ? children : null} */}
                                                        {errorMessage && (
                                                                <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                                                    <i className="ri-error-warning-fill text-xl text-red-500" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errorMessage && <p className="text-xs text-red-600 mt-2">{errorMessage}</p>}
                                                        {children ? children : null}
													</div>
												</>
											)}
										</>
									)}
								</>
							)}
						</>
					)}
				</>
			)}
		</>
	)
}

export default FormInput
