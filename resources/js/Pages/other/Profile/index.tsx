import { useEffect } from 'react'
import { Head, Link, usePage } from '@inertiajs/react';
import { Tab } from '@headlessui/react'
import Chart, { type ChartItem } from 'chart.js/auto'
import VerticalLayout from '../../../layouts/Vertical';
// components
import { PopoverLayout } from '../../../components/HeadlessUI'
import { PageBreadcrumb } from '../../../components'

//image
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'

// dummy data
import { experienceData, messages, productConfig, projectTableData } from './data'


const ProfilePages = () => {
    const props: any = {
        title: 'Profile',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
    const { auth } = usePage().props;
	const PopoverToggle = () => <i className="ri-more-2-fill" />

	useEffect(() => {
		const productTag = document.getElementById('high-performing-product') as ChartItem
		const chart = new Chart(productTag, productConfig)

		return () => {
			chart.destroy()
		}
	}, [])

	return (
		<>
            <VerticalLayout {...props}>
                {/* <PageBreadcrumb title="Profile" subName="Extra Pages" /> */}
                <div className="grid xl:grid-cols-12 lg:grid-cols-12 grid-cols-1 gap-6">
                    <div className="xl:col-span-4 lg:col-span-5">
                        <div className="card text-center p-6 mb-6">
                            <img src={avatar1} alt="" className="w-24 rounded-full p-1 border border-gray-200 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 mx-auto" />
                            <h4 className="mb-1 mt-3 text-lg">{auth?.user.first_name + ' ' + auth?.user.last_name}</h4>
                            {/* <p className="text-gray-400 mb-4">Founder</p> */}

                            <div className="text-start mt-6">
                                <h4 className="text-sm uppercase mb-2.5">About Me :</h4>
                                <p className="text-gray-400 mb-6">Hi I'm {auth?.user.first_name + ' ' + auth?.user.last_name},has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                                <p className="text-zinc-400 mb-3">
                                    <strong>Full Name :</strong> <span className="ms-2">{auth?.user.first_name + ' ' + auth?.user.last_name}</span>
                                </p>
                                {/* <p className="text-zinc-400 mb-3">
                                    <strong>Mobile :</strong>
                                    <span className="ms-2">(123) 123 1234</span>
                                </p> */}
                                <p className="text-zinc-400 mb-3">
                                    <strong>Email :</strong> <span className="ms-2 ">{auth?.user.email}</span>
                                </p>
                                {/* <p className="text-zinc-400 mb-1.5">
                                    <strong>Location :</strong> <span className="ms-2">USA</span>
                                </p> */}
                            </div>

                            {/* <ul className="social-list list-inline mt-6 ">
                                <li className="me-2 inline-block">
                                    <Link href="" className="h-8 w-8 leading-7 block border-2 rounded-full border-primary text-primary">
                                        <i className="ri-facebook-circle-fill"></i>
                                    </Link>
                                </li>
                                <li className="me-2 inline-block">
                                    <Link href="" className="h-8 w-8 leading-7 block border-2 rounded-full border-danger text-danger">
                                        <i className="ri-google-fill"></i>
                                    </Link>
                                </li>
                                <li className="me-2 inline-block">
                                    <Link href="" className="h-8 w-8 leading-7 block border-2 rounded-full border-info text-info">
                                        <i className="ri-twitter-fill"></i>
                                    </Link>
                                </li>
                                <li className="me-2 inline-block">
                                    <Link href="" className="h-8 w-8 leading-7 block border-2 rounded-full border-secondary text-secondary">
                                        <i className="ri-github-fill"></i>
                                    </Link>
                                </li>
                            </ul> */}
                        </div>
                    </div>

                    <div className="xl:col-span-8 lg:col-span-7">
                        <div className="card p-6">
                            <Tab.Group>
                                <Tab.List as="nav" className="flex flex-wrap space-x-2 bg-light dark:bg-gray-700/60 mb-6" aria-label="Tabs">
                                    <Tab type="button" className={({ selected }) => `${selected ? 'bg-primary text-white' : 'text-gray-500 hover:text-primary  bg-transparent'} flex-auto py-2 px-4 inline-flex justify-center items-center gap-2 text-center text-sm font-semibold  dark:hover:text-gray-400 first:rounded-s-md last:rounded-e-md`}>
                                        Settings
                                    </Tab>
                                </Tab.List>

                                <Tab.Panels className="mt-3">
                                    <Tab.Panel id="fill-and-justify-3" aria-labelledby="fill-and-justify-item-3">
                                        <form>
                                            <h5 className="mb-9 uppercase text-base">
                                                <i className="ri-contacts-book-2-line me-1.5"></i> Personal Info
                                            </h5>
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2.5">
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="firstname" className="font-semibold text-sm text-gray-500">
                                                            First Name
                                                        </label>
                                                        <input type="text" className="form-input" id="firstname" placeholder="Enter first name" />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="lastname" className="font-semibold text-sm text-gray-500">
                                                            Last Name
                                                        </label>
                                                        <input type="text" className="form-input" id="lastname" placeholder="Enter last name" />
                                                    </div>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="userbio" className="font-semibold text-sm text-gray-500">
                                                            Bio
                                                        </label>
                                                        <textarea className="form-input" id="userbio" rows={4} placeholder="Write something..."></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2.5">
                                                {/* <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="useremail" className="font-semibold text-sm text-gray-500">
                                                            Email Address
                                                        </label>
                                                        <input type="email" className="form-input" id="useremail" placeholder="Enter email" />
                                                        <span className="text-gray-500">
                                                            <small>
                                                                If you want to change email please{' '}
                                                                <Link href="" className="text-primary">
                                                                    click
                                                                </Link>{' '}
                                                                here.
                                                            </small>
                                                        </span>
                                                    </div>
                                                </div> */}
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="userpassword" className="font-semibold text-sm text-gray-500">
                                                            Password
                                                        </label>
                                                         <br></br>
                                                        {/* <input type="password" className="form-input" id="userpassword" placeholder="Enter password" /> */}
                                                        <span className="text-gray-500">
                                                            <small>
                                                                If you want to change password please{' '}
                                                                <Link href="" className="text-primary">
                                                                    click
                                                                </Link>{' '}
                                                                here.
                                                            </small>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <h5 className="text-base mb-6 uppercase bg-light p-2 dark:bg-gray-700">
                                                <i className="ri-building-line me-1.5"></i> Company Info
                                            </h5>
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2.5">
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="companyname" className="font-semibold text-sm text-gray-500">
                                                            Company Name
                                                        </label>
                                                        <input type="text" className="form-input" id="companyname" placeholder="Enter company name" />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="cwebsite" className="font-semibold text-sm text-gray-500">
                                                            Website
                                                        </label>
                                                        <input type="text" className="form-input" id="cwebsite" placeholder="Enter website url" />
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="text-base mb-6 uppercase bg-light p-2 dark:bg-gray-700">
                                                <i className="ri-global-line me-1.5"></i> Social
                                            </h5>
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2.5">
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="social-fb" className="font-semibold text-sm text-gray-500">
                                                            Facebook
                                                        </label>
                                                        <div className="flex">
                                                            <span className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                                                <i className="ri-facebook-fill"></i>
                                                            </span>
                                                            <input type="text" className="form-input rounded-s-none" id="social-fb" placeholder="Url" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="social-tw" className="font-semibold text-sm text-gray-500">
                                                            Twitter
                                                        </label>
                                                        <div className="flex">
                                                            <span className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                                                <i className="ri-twitter-line"></i>
                                                            </span>
                                                            <input type="text" className="form-input rounded-s-none" id="social-tw" placeholder="Username" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="social-insta" className="font-semibold text-sm text-gray-500">
                                                            Instagram
                                                        </label>
                                                        <div className="flex">
                                                            <span className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                                                <i className="ri-instagram-line"></i>
                                                            </span>
                                                            <input type="text" className="form-input rounded-s-none" id="social-insta" placeholder="Url" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="social-lin" className="font-semibold text-sm text-gray-500">
                                                            Linkedin
                                                        </label>
                                                        <div className="flex">
                                                            <span className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                                                <i className="ri-linkedin-fill"></i>
                                                            </span>
                                                            <input type="text" className="form-input rounded-s-none" id="social-lin" placeholder="Url" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="social-sky" className="font-semibold text-sm text-gray-500">
                                                            Skype
                                                        </label>
                                                        <div className="flex">
                                                            <span className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                                                <i className="ri-skype-line"></i>
                                                            </span>
                                                            <input type="text" className="form-input rounded-s-none" id="social-sky" placeholder="@username" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-6 space-y-2">
                                                        <label htmlFor="social-gh" className="font-semibold text-sm text-gray-500">
                                                            Github
                                                        </label>
                                                        <div className="flex">
                                                            <span className="inline-flex items-center px-4 rounded-s border border-e-0 border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400">
                                                                <i className="ri-github-line"></i>
                                                            </span>
                                                            <input type="text" className="form-input rounded-s-none" id="social-gh" placeholder="Username" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="text-end">
                                                <button type="submit" className="btn bg-success text-white mt-3">
                                                    <i className="ri-save-line me-1"></i> Save
                                                </button>
                                            </div>
                                        </form>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </VerticalLayout>
		</>
	)
}

export default ProfilePages
