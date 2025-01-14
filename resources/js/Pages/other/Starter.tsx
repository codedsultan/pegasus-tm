import { route } from 'vendor/tightenco/ziggy/src/js';
import { PageBreadcrumb } from '../../components'
import VerticalLayout from '../../layouts/Vertical';
import { useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import React, { useState } from 'react';

const StarterPages = () => {
    const [form, setForm] = useState({
        name: '',
        // priority: '',
        files: [], // This is where the selected files will be stored
    });


    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            files: [...e.target.files], // Store the selected files as an array
        });
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        // formData.append('priority', form.priority);

        // Append each file
        form.files.forEach((file) => {
            formData.append('files[]', file); // Add files to the FormData
        });

        // Send the request
        console.log('FormData:', formData);

        router.post(route('boards.task.update',{id:3,update:3}), formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Optional; FormData sets this automatically
            },
            onFinish: () => {
                console.log('File upload complete');
            },
        });

    };
    // const { data, setData, post, progress } = useForm({
    //     name: null,
    //     avatar: null,
    //   })

    //   const formData = new FormData();

        // Append other form fields
        // formData.append('name', data?.name);

        // Append files
        // if (form.files && form.files.length > 0) {
        //     form.files.forEach((file, index) => {
        //         formData.append(`files[]`, file); // Use `files[]` for multiple files
        //     });
        // } else {
        //     console.log("No files selected");
    // function submit(e) {
    //   e.preventDefault()
    //     post(route('boards.task.update',{id:3,update:3}));

    // }
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
	return (
		<>
            <VerticalLayout {...props}>
			    <PageBreadcrumb title="Starter Page" subName="Pages" />



            <form onSubmit={submit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleInputChange}
                />

                {/* <input type="text" value={data.name || ''} onChange={e => setData('name', e.target?.value)} /> */}
                <input
                    type="file"
                    name="files[]"
                    multiple
                    onChange={handleFileChange}
                />

                {/* <input type="file" onChange={e => {setData((data)=> ({...data, avatar: e.target?.files[0].name} ))}} /> */}
                {/* {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
                )} */}
                <button type="submit">Submit</button>
            </form>

            </VerticalLayout>
		</>
	)
}

export default StarterPages
