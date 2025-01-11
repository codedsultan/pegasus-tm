import { Link, usePage } from "@inertiajs/react";
import VerticalLayout from '../../layouts/Vertical';
// import { ModalLayout } from '../../components/HeadlessUI'
import { useForm} from '@inertiajs/react';
// components
import { FormInput} from '../../components'
import { useState } from 'react';

const WorkspaceList = () => {

    const [newWorkspaceModal, setNewWorkspaceModal] = useState<boolean>(false)

    const toggleNewWorkspaceModal = () => {
        setNewWorkspaceModal((prevState) => !prevState)
    }

    const { data, setData, post, processing, reset, errors } = useForm({
		name: '',
	});

    const workspaces:any = usePage().props?.workspaces;
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
    // submit new workspace
    const handleNewWorkSpace = (e: React.FormEvent) => {
        e.preventDefault();
        post('/workspaces', {
			onSuccess: () => {
				setNewWorkspaceModal(false);
                setData('name', '');
                // refreshWorkspaceList();
			},
		});
    };

	return (
		<>
            <VerticalLayout {...props}>
                <div>
                    <h1>Your Workspaces</h1>
                    <ul>
                        {workspaces.map((workspace:any) => (
                        <li key={workspace.id}>
                            <Link href={`/workspaces/${workspace.id}`}>{workspace.name}</Link>
                        </li>
                        ))}
                    </ul>
                    <button type="button" onClick={() => toggleNewWorkspaceModal()} className="btn btn-primary">
                        Create New Workspace
                    </button>

                </div>


                {/* Add New Task Modal */}
                {/* <ModalLayout showModal={newWorkspaceModal} toggleModal={() => toggleNewWorkspaceModal()} panelClassName="mt-8 rounded-none min-w-[768px]" aria-hidden="true">
                    <div className="duration-300 ease-in-out transition-all sm:max-w-3xl sm:w-full sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                        <div className="flex justify-between items-center py-3 px-6 border-b dark:border-gray-700">
                            <h3 className="font-medium text-gray-600 dark:text-white text-base">Create New Task</h3>
                            <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" type="button" onClick={toggleNewWorkspaceModal}>
                                <i className="ri-close-line text-2xl" />
                            </button>
                        </div>
                        <div className="py-3 px-6 overflow-y-auto">
                            <form onSubmit={handleNewWorkSpace}>

                                <div className="grid sm:grid-cols-12 gap-6">
                                    <div className="lg:col-span-12 sm:col-span-12">
                                        <FormInput name="name" label="" placeholder="Enter Name" type="text" containerClass="space-y-1.5 mb-6" className="form-input" key="title"  value={data.name} errors={errors} onChange={(e) => setData('name', e.target.value)} />
                                    </div>

                                </div>


                                <div className="flex justify-end items-center gap-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn btn-primary w-full"
                                    >
						                {processing ? 'Creating...' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalLayout> */}
            </VerticalLayout>
        </>
  );
};

export default WorkspaceList;
