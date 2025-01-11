import { Link, useForm, usePage } from "@inertiajs/react";
import { route } from 'vendor/tightenco/ziggy/src/js';
// import VerticalLayout from '../../layouts/Vertical';
import { FormInput, CustomDatepicker, PageBreadcrumb ,FileUploader} from '../../components'
import VerticalLayout from '../../layouts/Vertical';
import { ModalLayout } from '../../components/HeadlessUI'
import React, { useState } from 'react';
const WorkspaceDetails = () => {
  const workspace:any = usePage().props?.workspace;
  const props: any = {
    title: 'A Single Workspace',
    description: 'Single Workspace Details',
  }
  const [newTaskBoardModal, setNewTaskBoardModal] = useState<boolean>(false);
  const toggleNewTaskBoardModal = () => {
    setNewTaskBoardModal((prevState) => !prevState);
  };

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
  });

  const handleNewTaskBoard = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('workspaces.board.create',{workspace:workspace.id}), {
      onSuccess: () => {
        setNewTaskBoardModal(false);
        setData('name', '');
      },
    });
  };
  return (
    <VerticalLayout {...props}>
        <div>
        <h1>{workspace.name}</h1>
        <h2>Task Boards</h2>
        <button type="button" onClick={() => toggleNewTaskBoardModal()} className="btn btn-primary">
            Create New Task Board
        </button>
        <ul>
            {workspace.boards.map((board: any) => (
                <Link href={`/workspaces/${workspace.id}/boards/${board.id}`} key={board.id}>
                    <li>{board.name}</li>
                </Link>
            ))}
        </ul>
        </div>

        {/* Add New Task Board Modal */}
        <ModalLayout showModal={newTaskBoardModal} toggleModal={() => toggleNewTaskBoardModal()} panelClassName="mt-8 rounded-none min-w-[768px]" aria-hidden="true">
            <div className="duration-300 ease-in-out transition-all sm:max-w-3xl sm:w-full sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                <div className="flex justify-between items-center py-3 px-6 border-b dark:border-gray-700">
                    <h3 className="font-medium text-gray-600 dark:text-white text-base">Create New Task Board</h3>
                    <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" type="button" onClick={toggleNewTaskBoardModal}>
                        <i className="ri-close-line text-2xl" />
                    </button>
                </div>
                <div className="py-3 px-6 overflow-y-auto">
                    <form onSubmit={handleNewTaskBoard}>

                        <div className="grid sm:grid-cols-12 gap-6">
                            <div className="lg:col-span-12 sm:col-span-12">
                                <FormInput name="name" label="" placeholder="Enter Name" type="text" containerClass="space-y-1.5 mb-6" className="form-input" key="title"  value={data.name} errors={errors} onChange={(e) => setData('name', e.target.value)} />
                            </div>

                        </div>


                        <div className="flex justify-end items-center gap-2">
                            {/* <button className="btn bg-light text-gray-800 transition-all dark:bg-gray-700 dark:text-gray-100" type="button" onClick={toggleNewTaskBoardModal}>
                                Close
                            </button> */}
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
        </ModalLayout>
    </VerticalLayout>
  );
};

export default WorkspaceDetails;
