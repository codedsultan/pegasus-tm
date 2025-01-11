import { useEffect, useState ,useCallback, use} from 'react'
import { Head, Link, usePage } from '@inertiajs/react';

import { TaskTypes ,AssigneeTypes, UserTypes} from './data'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

// import { useForm } from 'react-hook-form'
import { useForm ,router} from '@inertiajs/react';

import TaskItem from './TaskItem'

// components
import { FormInput, CustomDatepicker, PageBreadcrumb ,FileUploader} from '../../../components'
import { ModalLayout } from '../../../components/HeadlessUI'
import { Tab } from '@headlessui/react'
import VerticalLayout from '@/layouts/Vertical';
import Task from '../../apps/Tasks/TasksDetails/Task';
import { route } from 'vendor/tightenco/ziggy/src/js';

interface StateType {
	todoTasks: TaskTypes[]
	inprogressTasks: TaskTypes[]
	reviewTasks: TaskTypes[]
	doneTasks: TaskTypes[]
}

interface CommentFormState {
    content: string; // The main content of the comment
    errors: Record<string, string>; // A dictionary for form field errors
    attachments: File[]; // An array of attached files
    taskId?: number;
    parentId?: number;
    isReply?: boolean;
    repliedTo?: number;
    quotedUser?: string;
}
interface FileWithPreview extends File {
    preview?: string;
}

interface TaskFormData {
    title?: string;
    description?: string;
    assignees: string[];
    assignTo?: string;
    dueDate?: Date;
    status?: string;
    priority?: string;
    files?: any[] ;
    boardId?: number;
    workspaceId?: number;
}

interface Comment {
    id: number;
    content: string;
    user: {
      id: number;
      name: string;
      avatarUrl?: string;
    };
    parentId?: number;
    taskId?: number;
    attachments?: {
      id: number;
      fileName: string;
      fileUrl: string;
      fileType: string;
    }[];
    createdAt: string;
    updatedAt?: string;
    replies?: Comment[];
  }


const KanbanApp = () => {
    const props = usePage().props;
    const workspace : any = usePage().props?.workspace;
    const board : any = usePage().props?.board;
    const { data, setData, post, processing, reset, errors } = useForm({
		category: '',
		title: '',
		priority: '',
		description: '',
		assignTo: '',
		dueDate: new Date(),
		status: 'Todo',
        boardId: board?.id,
        workspaceId: workspace?.id,
	});

    const updateTasks = useForm({
        sourceId: '',
        destinationId: '',
        updatedState: {},
    });

    const tasks = props.tasks as TaskTypes[];
    const assignees = props.assignees as UserTypes[];

    // order tasks by order
	const [state, setState] = useState<StateType>({
        todoTasks: tasks.filter((t) => t.status === 'Todo'),
        // inprogressTasks: tasks.filter((t) => t.status === 'Inprogress'),
		inprogressTasks: tasks.filter((t) => t.status === 'Inprogress').sort((a, b) => a.order - b.order),
        reviewTasks: tasks.filter((t) => t.status === 'Review'),
		doneTasks: tasks.filter((t) => t.status === 'Done'),
	})
	const [totalTasks, setTotalTasks] = useState<number>(tasks.length)
	const [newTaskModal, setNewTaskModal] = useState<boolean>(false)
	const [newTaskDetails, setNewTaskDetails] = useState<any>(null)


	const BreadcrumbChild = () => {
		return (
			<button
				className="btn btn-sm !rounded bg-success text-white"
				type="button"
				onClick={() => {
					toggleNewTaskModal()
					newTask('Todo', 'todoTasks')
				}}
			>
				Add Task
			</button>
		)
	}

    // Handles input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setData(name as keyof typeof data, value);
	};

	// Handles the date picker changes
	const handleDateChange = (date: Date) => {
		setData('dueDate', date);
	};

	// Handles the form submission
	const handleNewTask = (e: React.FormEvent) => {
		e.preventDefault();
		// Include the status and queue from the current modal details
		setData('status', newTaskDetails.status);
		post(route('boards.task.store',{id:board?.id,workspace:workspace?.id,board:board?.id}), {
			onSuccess: () => {
				setNewTaskModal(false);
                refreshTaskList();
				// setTotalTasks(totalTasks + 1);
			},
		});
	};

	/**
	 * Toggles the new task modal
	 */
	function toggleNewTaskModal() {
		setNewTaskModal((prevState) => !prevState)
	}

	/**
	 * Toggles the description modal
	 */

    const { task } = usePage<{ task: TaskTypes | null }>().props;
    const currentUrl = new URL(window.location.href);
    const emptyTaskParam = currentUrl.searchParams.get('task')?.toString() !== "";
    // console.log('task param:: '+ emptyTaskParam);
    var isCurrentTask: boolean =  currentUrl.searchParams.get('task')?.toString() !== undefined && currentUrl.searchParams.get('task')?.toString() !== "" && currentUrl.searchParams.get('update')?.toString() === undefined   ;
    // var isCurrentUpdateTask: boolean = currentUrl.searchParams.get('update')?.toString() === task?.id?.toString() && currentUrl.searchParams.get('update')?.toString() !== undefined;
    // var isCurrentDeleteTask: boolean = usePage().props.deleted === currentUrl.searchParams.get('task')?.toString() && currentUrl.searchParams.get('deleted')?.toString() !== undefined;
    // console.log('is current task ::' + isCurrentTask + '--searchParams ::' + currentUrl.searchParams.get('task')?.toString() + 'Task id::' + task?.id?.toString() + Date.now());
    // console.log('deleted props ::' + currentUrl.searchParams.get('deleted')?.toString());

    // console.log('is delete task ::' + isCurrentDeleteTask + '--searchParams ::' + currentUrl.searchParams.get('deleted')?.toString() + 'Task id::' + currentUrl.searchParams.get('task')?.toString());
    const [descriptionModal, setDescriptionModal] = useState<boolean>(isCurrentTask)

    const [updateTaskModal, setUpdateTaskModal] = useState<boolean>(false)

    const updateTaskForm = useForm<TaskFormData>({
        title: '',
        priority: '',
        description: '',
        assignTo: '',
        dueDate: new Date(),
        status: '',
        assignees: [],
        files: [],
        boardId: board?.id,
        workspaceId: workspace?.id,
    });


    const { setData: updateForm } = updateTaskForm;

    const handleUpdateTaskDate = (date: Date) => {
		updateTaskForm.setData('dueDate', date);
	};

    const deleteFile = (fileId: any) => {
        router.delete(route('board.tasks.deleteFile',{workspace:workspace?.id,board:board?.id,mediaId:fileId}),{
            onSuccess: () => {
                console.log('File deleted successfully');
            },
        });
    };
    const handleTaskFileUpload = (files: any[]) => {
        const formData = new FormData();
        formData.append('id', task?.id?.toString() || '');
        files.forEach((file) => {
            formData.append('files[]', file); // Add files to the FormData
        });
        // Send the request
        console.log('FormData:', formData);

        router.post(route('board.tasks.uploadFiles',{workspace:workspace?.id,board:board?.id,task:task?.id}), formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Optional; FormData sets this automatically
            },
            onFinish: () => {
                // console.log('File upload complete');
                // files = [];
            },
        });

    };

    const toggleUpdateTaskModal = (task:any) => {
        updateTaskForm.clearErrors();
        setUpdateTaskModal((prevState) => {
            const newState = !prevState;
            return newState;
        });


        router.get(
            route('workspaces.board.show',{workspace:workspace?.id,board:board?.id}),
            !updateTaskModal ? { task: task?.id , update: task?.id } : { task: null , update: null },
            {
              onSuccess: () => {
                updateTaskForm.setData({
                    title: task?.title,
                    priority: task?.priority,
                    description: task?.description,
                    assignTo: task?.assignedTo,
                    dueDate: new Date(task?.due_date),
                    status: task?.status,
                    assignees: task?.assignee_ids,
                    // files: task?.files,
                });
              },
              preserveState: true,
              preserveScroll: true,
              only: ['task','tasks'],
            }
          );

    }
    // isCurrentUpdateTask && toggleUpdateTaskModal(task);
    const handleUpdateTask = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('in handleUpdateTask ::' + 'task :' + task);
        updateTaskForm.post(route('board.tasks.update',{workspace:workspace?.id,board:board?.id,task:task?.id,update:task?.id}), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                refreshTaskList(task);
            },
            onError: (error) => {
                console.log('in handleUpdateTask ::' + 'error :' + error);
            },
        });
    };
	const toggleDescriptionModal = (task:any) => {
        updateTaskForm.clearErrors();
            setDescriptionModal((prevState) => {
                const newState = !prevState;
                console.log('in toggleDescriptionModal :: state:', newState); // Correctly log the new state
                return newState;
            });

            router.get(
              route('workspaces.board.show',{workspace:workspace?.id,board:board?.id}),
              !descriptionModal ? { task: task?.id } : { task: null },
              {
                onSuccess: () => {
                  console.log('in toggleDescriptionModal ::' + 'onSuccess');
                  isCurrentTask = currentUrl.searchParams.get('task')?.toString() === task?.id?.toString();
                },
                preserveState: true,
                preserveScroll: true,
                only: ['task','assignees'],
              }
            );

        console.log('in toggleDescriptionModal ::' + 'after state :' + descriptionModal);
	}

    useEffect(() => {
        setDescriptionModal(isCurrentTask);
    }, [isCurrentTask]);

	/**
	 * Creates new empty task with given status
	 * @param status
	 * @param queue
	 */
	const newTask = (status: string, queue: string) => {
		setNewTaskDetails({
			dueDate: new Date(),
			status: status,
			queue: queue,
		})
		setNewTaskModal(true)
	}

	/**
	 * When date changes
	 * @param {} date
	 */

	// a little function to help us with reordering the result
	const reorder = (list: any[], startIndex: number, endIndex: number) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	/**
	 * Moves an item from one list to another list.
	 */
	const move = (source: Iterable<unknown> | ArrayLike<unknown>, destination: Iterable<unknown> | ArrayLike<unknown>, droppableSource: { index: number; droppableId: string | number }, droppableDestination: { index: number; droppableId: string | number }) => {

        const sourceClone = Array.from(source)
		const destClone = Array.from(destination)
		const [removed] = sourceClone.splice(droppableSource.index, 1)
		destClone.splice(droppableDestination.index, 0, removed)
		const result: any = {}
		result[droppableSource.droppableId] = sourceClone
		result[droppableDestination.droppableId] = destClone

		return result
	}

	/**
	 * Gets the list
	 */
	const getList = (id: string) => {
		const modifiedState: any = { ...state }
		const stateTasks: any = modifiedState[id] && modifiedState[id]
		return stateTasks
	}

	/**
	 * On drag end
	 */
	const onDragEnd = (result: DropResult) => {
        console.log('dragen...'+ JSON.stringify(result));
		const { source, destination } = result

		// dropped outside the list
		if (!destination) {
			return
		}
		if (source.droppableId === destination.droppableId) {
			const items = reorder(getList(source.droppableId), source.index, destination.index)
			const localState: any = { ...state }
			localState[source.droppableId] = items
			setState(localState)
            persistChanges(localState, source.droppableId);
		} else {
			const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination)
			const localState = { ...state, ...result }
			setState(localState)
            console.log(localState);
            console.log('droppable id'+source.droppableId);
            persistChanges(localState, source.droppableId, destination.droppableId);

		}
	}



    const persistChanges = (updatedState: any, sourceId: string, destinationId?: string) => {

        const tempData = {
            sourceId,
            destinationId: destinationId || null,
            updatedState,
        };

        console.log('in persist changes ::' + 'source id:' + sourceId + ' destination id:' + destinationId);

        updateTasks.setData('sourceId', sourceId);
        if (destinationId) {
            updateTasks.setData('destinationId', destinationId);
        }
        updateTasks.setData('updatedState', updatedState);

        console.log('in persist changes about to call ::' + 'source id:' + tempData.sourceId + ' destination id:' + tempData.destinationId);
        router.post(`/workspaces/${workspace?.id}/boards/${board?.id}/update-tasks`, tempData)

    };

	/**
	 * Handles the new task form submission
	 */

	const deleteTask = (taskId:any) => {
            router.delete(route('board.task.delete',{workspace:workspace?.id,board:board?.id,id:taskId}), {
                preserveScroll: true,
                onSuccess: () => {
                    setDescriptionModal(false);
                    console.log('in deleteTask ::' + 'onSuccess');
                    refreshTaskList();
                },
            });
      };

      const refreshTaskList = (task?:any) => {
        if(task?.id){
            router.visit(route('workspaces.board.show',{workspace:workspace?.id,board:board?.id, task: task?.id }), {
                only: ['tasks','task'],
            })
        }
        else{
            router.visit(route('workspaces.board.show',{workspace:workspace?.id,board:board?.id}), {
                only: ['tasks'],
            })
        }
      };

      const archiveTask = (task:any) => {
        router.patch(route('board.tasks.archive',{workspace:workspace?.id,board:board?.id,task:task?.id}), {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                refreshTaskList();
                console.log('in archiveTask ::' + 'onSuccess');
            },
        });
      };

    //   const commentsProps = usePage().props?.tcomments;
    const [comments, setComments] = useState<any>([]);

    useEffect(() => {
    setComments(task?.comments);
    }, [task?.comments]);


    const [commentForm, setCommentForm] = useState<CommentFormState>({
        content: '',
        errors: {},
        // taskId: task?.id,
        parentId: undefined,
        isReply: false,
        repliedTo: undefined,
        quotedUser: '',
        attachments: [],
    });

    const [commentReplyForm, setCommentReplyForm] = useState<CommentFormState>({
        content: '',
        errors: {},
        // taskId: task?.id,
        parentId: undefined,
        isReply: false,
        repliedTo: undefined,
        quotedUser: '',
        attachments: [],
    });


    const [commentChildReplyForm, setCommentChildReplyForm] = useState<CommentFormState>({
        content: '',
        errors: {},
        // taskId: task?.id,
        parentId: undefined,
        isReply: false,
        repliedTo: undefined,
        quotedUser: '',
        attachments: [],
    });

    const [commentReplyingTo, setCommentReplyingTo] = useState(null);

    const [selectedCommentFiles, setSelectedCommentFiles] = useState<FileWithPreview[]>([]);
    const [replyingTo, setReplyingTo] = useState(null);

    const [childreplyingTo, setChildReplyingTo] = useState(null);

    const handleReplyingTo = (commentId: number, repliedTo: number) => {
        // e.preventDefault();

        console.log('in handleReplyingTo ::' + 'commentId:' + commentId + ' repliedTo:' + repliedTo );

        setCommentReplyingTo(commentId as any);

        setCommentReplyForm({
            ...commentReplyForm,
            repliedTo: repliedTo,
            // quotedUser: quotedUser,
            parentId: commentId,
        });

        handleSendComment('reply', commentId, repliedTo);
    }

    const handleChildReplyingTo = (commentId: number, repliedTo: number, quotedUser: string) => {
        setChildReplyingTo(commentId as any);

        setCommentChildReplyForm({
            ...commentForm,
            repliedTo: repliedTo,
            quotedUser: quotedUser,
            parentId: commentId,
        });

        handleSendComment('childReply', commentId, repliedTo, quotedUser);
    };

    const updateComment = (key: string, value: any) => {
        setCommentForm((prev) => ({
        ...prev,
        [key]: value,
        }));
    };

    const handleCommentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return;
        // const files = Array.from(e.target.files) as File[];
        const files = Array.from(e.target.files) as FileWithPreview[];

        const filesWithPreview = files.map((file) => {
            if (file.type.startsWith('image/')) {
              file.preview = URL.createObjectURL(file);
            }
            return file;
        });
        setSelectedCommentFiles((prev: File[]) => [...prev, ...filesWithPreview]);
        // setSelectedCommentFiles([...filesWithPreview]);
        setCommentForm((prev) => ({
            ...prev,
            attachments: selectedCommentFiles,
          }));

      };

      const removeCommentFile = (index: number) => {
        const updatedCommentFiles = selectedCommentFiles.filter((_, i) => i !== index);
        setSelectedCommentFiles(updatedCommentFiles);

        setCommentForm((prev) => ({
          ...prev,
          attachments: updatedCommentFiles,
        }));
      };

    const handleReply = (parentId: number) => {
        setCommentForm({
            ...commentForm,
            parentId,

        });
    };

    const handleSendComment = ( type?: any ,parentId?: number ,repliedTo?: number ,quotedUser?: string) => {
        console.log('in handleSendComment ::' + 'type:' + type );
        const formData = new FormData();

        if (type === 'comment') {
            formData.append('content', commentForm.content);
        }
        if (type === 'reply') {
            formData.append('content', commentReplyForm.content);
        }
        if (type === 'childReply') {
            formData.append('content', commentChildReplyForm.content);
        }
        // formData.append('content', commentForm.content);
        if (task?.id) {
            formData.append('task_id', task?.id.toString());
        }

        if (repliedTo) {
            formData.append('replied_to', repliedTo?.toString());
        }

        if (quotedUser) {
            formData.append('quoted_user', quotedUser);
        }

        if (parentId) {
            formData.append('parent_id', parentId.toString());
        }
        selectedCommentFiles.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file);
        });


        router.post(route('comments.store'), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
        },


        preserveState: true,
          onFinish: ()  => {
            console.log('Comment submitted successfully!');
            if(type === 'comment'){
                setCommentForm({
                    content: '',
                    parentId: undefined,
                    isReply: false,
                    repliedTo: undefined,
                    quotedUser: '',
                    errors: {},
                    attachments: [],
                });
            }
            if(type === 'reply'){
                setReplyingTo(null);
                setCommentReplyForm({
                    content: '',
                    errors: {},
                    taskId: task?.id,
                    parentId: undefined,
                    isReply: false,
                    repliedTo: undefined,
                    quotedUser: '',
                    attachments: [],
                });
            }
            if(type === 'childReply'){
                setChildReplyingTo(null);
                setCommentChildReplyForm({
                    content: '',
                    errors: {},
                    taskId: task?.id,
                    parentId: undefined,
                    isReply: false,
                    repliedTo: undefined,
                    quotedUser: '',
                    attachments: [],
                });


            }
          },
        });
    };


    const renderComments = (comments:any) => {
        return  comments.map((comment:any, idx:number) => (
                <div key={idx} className="flex gap-5 border rounded-md border-gray-300 dark:border-gray-700 p-3 mb-2">
                    <img src={comment.user?.avatar_img || comment.user?.avatar} alt="" className="h-12 rounded-full" />
                    <div className="w-full">
                        <h5 className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">{comment.user?.fullname}</h5>
                        <p className="font-light mb-2">{comment.content}</p>
                        <button
                            onClick={() => setReplyingTo(comment.id)}
                            className="text-sm text-blue-500"
                        >
                            Reply
                        </button>
                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                            <>
                                <textarea
                                    className="form-input w-full p-2 border rounded"
                                    placeholder="Write your reply..."
                                    rows={2}
                                    value={commentReplyForm.content}
                                    onChange={(e) =>
                                        setCommentReplyForm({
                                            ...commentReplyForm,
                                            content: e.target.value,
                                        })
                                    }
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={() => handleReplyingTo( comment.parent_id || comment.id, comment.id)}
                                        className="btn btn-sm bg-primary text-white"
                                    >
                                        Submit Reply
                                    </button>
                                </div>
                            </>
                        )}
                        {comment.replies?.length > 0 ? (
                            comment.replies.map((reply:any, idx:number) => (
                            <div key={idx}>
                                <div className="flex gap-5 border rounded-md border-gray-300 dark:border-gray-700 p-3 mb-2">
                                    <img src={reply.user?.avatar_img || reply.user?.avatar} alt="" className="h-12 rounded-full" />
                                    <div className="w-full">
                                        <h5 className=" text-gray-500 dark:text-gray-400 font-semibold">{reply.user?.fullname}</h5>
                                        <p className="font-light mb-2">{ reply.quoted_user ? ('@ '+ reply.quoted_user + ' : ' + reply.content ): reply.content}</p>
                                    </div>

                                    <button
                                        onClick={() => setChildReplyingTo(reply.id)}
                                        className="text-sm text-blue-500"
                                    >
                                        Reply
                                    </button>
                                </div>
                                <div>
                                    {/* ChildReply Form */}
                                    {childreplyingTo === reply.id && (

                                        <div className="mb-2 ml-6">
                                            <textarea
                                                className="form-input w-full p-2 border rounded"
                                                placeholder="Write your reply..."
                                                rows={2}
                                                value={commentChildReplyForm.content}
                                                onChange={(e) =>
                                                    setCommentChildReplyForm({
                                                        ...commentChildReplyForm,
                                                        content: e.target.value,
                                                    })
                                                }
                                            ></textarea>
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>  handleChildReplyingTo(comment.id, reply.id, reply.user?.fullname)}
                                                    className="btn btn-sm bg-primary text-white"
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            ))
                        ) : (
                            <p className="font-light text-gray-500 dark:text-gray-400">
                                No replies for this comment.
                            </p>
                        )}
                    </div>
                </div>
            )
        );
    };

	return (
		<>
            <VerticalLayout {...props}>
            <PageBreadcrumb title={{id: board?.id, name: board?.name, url: `/workspaces/${workspace?.id}/boards/${board?.id}`}} subName={{id: workspace?.id, name: workspace?.name, url: `/workspaces/${workspace?.id}`}} addedChild={<BreadcrumbChild />} />
                <div className="grid w-full">
                    <div className="overflow-hidden text-gray-700 dark:text-slate-400">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex overflow-x-auto custom-scroll gap-6 pb-4 h-[calc(100vh-235px)]">
                                <Droppable droppableId="todoTasks">
                                    {(provided: any) => (
                                        <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-80 border rounded-md border-gray-200 dark:border-gray-700 p-4">
                                            <h5 className="uppercase mb-4">ToDo ({state.todoTasks.length})</h5>
                                            <div className="flex flex-col gap-4 kanban-board custom-scroll overflow-x-hidden overflow-y-auto px-1 h-full">
                                                {(state.todoTasks || []).map((item, idx) => (
                                                    <Draggable draggableId={item.id + ''} index={idx} key={item.id}>
                                                        {(provided: any) => (
                                                            <div className="card cursor-pointer" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <TaskItem task={item} toggleDescriptionModal={() => toggleDescriptionModal(item)} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>

                                <Droppable droppableId="inprogressTasks">
                                    {(provided: any) => (
                                        <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-80 border rounded-md border-gray-200 dark:border-gray-700 p-4">
                                            <h5 className="uppercase mb-4">IN PROGRESS ({state.inprogressTasks.length})</h5>
                                            <div className="flex flex-col gap-4 kanban-board custom-scroll overflow-x-hidden overflow-y-auto px-1 h-full">
                                                {(state.inprogressTasks || []).map((item, idx) => (
                                                    <Draggable draggableId={item.id + ''} index={idx} key={item.id}>
                                                        {(provided: any) => (
                                                            <div className="card cursor-pointer" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <TaskItem task={item} toggleDescriptionModal={() => toggleDescriptionModal(item)} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>

                                <Droppable droppableId="reviewTasks">
                                    {(provided: any) => (
                                        <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-80 border rounded-md border-gray-200 dark:border-gray-700 p-4">
                                            <h5 className="uppercase mb-4">Review ({state.reviewTasks.length})</h5>
                                            <div className="flex flex-col gap-4 kanban-board custom-scroll overflow-x-hidden overflow-y-auto px-1 h-full">
                                                {(state.reviewTasks || []).map((item, idx) => (
                                                    <Draggable draggableId={item.id + ''} index={idx} key={item.id}>
                                                        {(provided: any) => (
                                                            <div className="card cursor-pointer" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <TaskItem task={item} toggleDescriptionModal={()=> toggleDescriptionModal(item)} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>

                                <Droppable droppableId="doneTasks">
                                    {(provided: any) => (
                                        <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-80 border rounded-md border-gray-200 dark:border-gray-700 p-4">
                                            <h5 className="uppercase mb-4">Done ({state.doneTasks.length})</h5>
                                            <div className="flex flex-col gap-4 kanban-board custom-scroll overflow-x-hidden overflow-y-auto px-1 h-full">
                                                {(state.doneTasks || []).map((item, idx) => (
                                                    <Draggable draggableId={item.id + ''} index={idx} key={item.id}>
                                                        {(provided: any) => (
                                                            <div className="card cursor-pointer" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <TaskItem task={item} toggleDescriptionModal={() => toggleDescriptionModal(item)} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </DragDropContext>
                    </div>
                </div>

                {/* Add New Task Modal */}
                <ModalLayout showModal={newTaskModal} toggleModal={() => toggleNewTaskModal()} panelClassName="mt-8 rounded-none min-w-[768px]" aria-hidden="true">
                    <div className="duration-300 ease-in-out transition-all sm:max-w-3xl sm:w-full sm:mx-auto flex flex-col bg-white shadow-sm rounded dark:bg-gray-800">
                        <div className="flex justify-between items-center py-3 px-6 border-b dark:border-gray-700">
                            <h3 className="font-medium text-gray-600 dark:text-white text-base">Create New Task</h3>
                            <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" type="button" onClick={toggleNewTaskModal}>
                                <i className="ri-close-line text-2xl" />
                            </button>
                        </div>
                        <div className="py-3 px-6 overflow-y-auto">
                            <form onSubmit={handleNewTask}>
                            {/* <FormInput
                                label="Email Address"
                                type="email"
                                name="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="form-input"
                                placeholder="Enter your email"
                                containerClass="mb-6 space-y-2"
                                labelClassName="font-semibold text-gray-500"
                                required
                                errors={errors.username}
                            > */}
                                {/* <FormInput name="category" label="Project" type="select" containerClass="w-full space-y-1.5 mb-6" className="form-select" key="category"  value={data.category} errors={errors} onChange={(e) => setData('category', e.target.value)}>
                                    <option>Attex</option>
                                    <option>CRM</option>
                                    <option>Design</option>
                                    <option>iOS</option>
                                </FormInput> */}

                                <div className="grid sm:grid-cols-12 gap-6">
                                    <div className="lg:col-span-12 sm:col-span-12">
                                        <FormInput name="title" label="" placeholder="Enter Title" type="text" containerClass="space-y-1.5 mb-6" className="form-input" key="title"  value={data.title} errors={errors} onChange={(e) => setData('title', e.target.value)} />
                                    </div>
                                    {/* <div className="lg:col-span-4 sm:col-span-6">
                                        <FormInput name="priority" label="Priority" type="select" containerClass="space-y-1.5 mb-6" className="form-select" key="priority" value={data.priority} errors={errors} onChange={(e) => setData('priority', e.target.value)}>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </FormInput>
                                    </div> */}
                                </div>

                                {/* <FormInput name="description" label="Description" type="textarea" containerClass="w-full space-y-1.5 mb-6" className="form-input" rows={3} key="description" value={data.description} errors={errors} onChange={(e) => setData('description', e.target.value)} /> */}

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* <div className="col-md-6">
                                        <FormInput name="assignTo" label="Assign To" type="select" containerClass="space-y-1.5 mb-6" labelClassName="font-semibold text-gray-500" className="form-select" key="assignTo" value={data.assignTo} errors={errors} onChange={(e) => setData('assignTo', e.target.value)}>
                                            {(assignees || []).map((assignee, idx) => (
                                                <option key={idx} value={assignee.id}>
                                                    {assignee.fullname}
                                                </option>
                                            ))}
                                        </FormInput>
                                    </div> */}
                                    {/* <div className="col-md-6">
                                        <div className="space-y-1.5 mb-6 flex flex-col">
                                            <label htmlFor="task-priority" className="font-semibold text-gray-500">
                                                Due Date
                                            </label>
                                            <CustomDatepicker
                                                hideAddon
                                                dateFormat="yyyy-MM-dd"
                                                value={newTaskDetails?.dueDate}
                                                inputClass="form-input"
                                                onChange={(date) => {
                                                    handleDateChange(date)
                                                }}
                                            />
                                        </div>
                                    </div> */}
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    {/* <button className="btn bg-light text-gray-800 transition-all dark:bg-gray-700 dark:text-gray-100" type="button" onClick={toggleNewTaskModal}>
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

                {/* Description Modal */}

                {/* {tru && */}
                <ModalLayout showModal={descriptionModal} toggleModal={() => toggleDescriptionModal(task)} aria-hidden="true">
                    <div className="bg-white pointer-events-none relative w-auto -translate-y-5 transition-all duration-300 ease-in-out sm:max-w-2xl md:max-w-3xl sm:w-full h-full flex items-center rounded-md shadow-lg dark:bg-gray-800 sm:mx-auto">
                        <div className="pointer-events-auto relative flex w-full flex-col">
                            <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700 pt-8">
                                <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                                    {task?.title}
                                    <span className={`inline-flex items-center gap-1.5 p-1 rounded-md text-xs font-medium ms-3 ${task?.priority === 'High' ? 'bg-danger/10 text-danger' : task?.priority === 'Medium' ? 'bg-warning/10 text-warning' : task?.priority === 'Low' ? 'bg-success/10 text-success' : ''}`}>{task?.priority}</span>
                                </h3>
                                <div className="mb-2 inline-block">
                                    <button type="button" onClick={() => toggleUpdateTaskModal(task)} className="btn btn-link text-xl">
                                        <i className="ri-edit-line"></i>
                                    </button>
                                    <button type="button" onClick={() => deleteTask(task?.id)} className="btn btn-link text-xl">
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                    <button type="button" onClick={() => archiveTask(task)} className="btn btn-link text-xl">
                                        <i className="ri-archive-drawer-fill"></i>
                                    </button>


                                </div>
                                <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" onClick={() =>toggleDescriptionModal(task)} type="button">
                                    <i className="ri-close-line text-xl"></i>
                                </button>
                            </div>

                            <div className="px-4 py-8 overflow-y-auto">
                                <h5 className="mb-1">Description:</h5>
                                <p className="font-light text-gray-500 dark:text-gray-400">{task?.description}</p>

                                <div className="my-7">
                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <div className="col-span-1">
                                            <h5 className="mb-2 text-gray-600">Create Date</h5>
                                            <p className="font-normal text-gray-500 dark:text-gray-400">
                                                {task?.created_at ? new Date(task?.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                }): null } <small className="font-light">{task?.created_at ? new Date(task?.created_at).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                }): null} PM</small>
                                            </p>
                                        </div>

                                        <div className="col-span-1">
                                            <h5 className="mb-2 text-gray-600">Due Date</h5>
                                            <p className="font-normal text-gray-500 dark:text-gray-400">
                                                {task?.due_date ? new Date(task?.due_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                }): null } <small className="font-light">{task?.due_date ? new Date(task?.due_date).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                }): null} PM</small>
                                                {/* 22 December 2023 <small className="font-light">1:00 PM</small> */}
                                            </p>
                                        </div>

                                        <div className="col-span-1">
                                            <h5 className="mb-2 text-gray-600">Asignee:</h5>
                                            <div className="flex items-center">

                                                {(task?.assignees || []).map((assignee:any, idx:number) => (
                                                // <>
                                                    <div key={idx} className="-me-3">
                                                        <Link key={idx} href={assignee.avatar} target="_blank">
                                                            <img src={assignee.avatar_img || assignee.avatar} alt="" className="rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200" />
                                                        </Link>
                                                        <div className="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                                            {assignee.fullname}
                                                            <div className="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]"></div>
                                                        </div>
                                                    </div>
                                                // </>

                                                ))}

                                                {/* </div>
                                                    <Link href="">
                                                        <img src={avatar1} alt="" className="rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200" />
                                                    </Link>
                                                    <div className="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                                        Tosha
                                                        <div className="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]"></div>
                                                    </div>
                                                </div> */}

                                                {/* <div className="-me-3">
                                                    <Link href="">
                                                        <div className="bg-warning text-white font-medium flex items-center justify-center rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200">K</div>
                                                    </Link>
                                                    <div className="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                                        Hooker
                                                        <div className="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]"></div>
                                                    </div>
                                                </div> */}

                                                {/* <div className="-me-3">
                                                    <Link href="">
                                                        <img src={avatar5} alt="" className="rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200" />
                                                    </Link>
                                                    <div className="bg-slate-700 hidden px-2 py-1 rounded transition-all text-white opacity-0 z-50" role="tooltip">
                                                        Brain
                                                        <div className="bg-slate-700 w-2.5 h-2.5 rotate-45 -z-10 rounded-[1px]"></div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Tab.Group>
                                    <Tab.List as="nav" className="flex space-x-5 border-b border-gray-300 dark:border-gray-700" aria-label="Tabs">
                                        <Tab key={'comments'} type="button" className={({ selected }) => `py-4 px-1 inline-flex items-center gap-2 border-b-2 -mb-px transition-all text-sm whitespace-nowrap dark:text-gray-400 hover:text-primary ${selected ? 'font-semibold border-primary text-primary active' : 'border-transparent text-gray-500'}`}>
                                            Comments
                                        </Tab>
                                        <Tab key={'files'} type="button" className={({ selected }) => `py-4 px-1 inline-flex items-center gap-2 border-b-2 -mb-px transition-all text-sm whitespace-nowrap dark:text-gray-400 hover:text-primary ${selected ? 'font-semibold border-primary text-primary active' : 'border-transparent text-gray-500'}`}>
                                            Files
                                        </Tab>
                                    </Tab.List>

                                    <Tab.Panels className="mt-5 overflow-hidden">
                                        <Tab.Panel className="transition-all duration-300 transform">
                                            {/* <textarea className="form-input mt-2" id="example-textarea" placeholder="Write message" rows={4}></textarea> */}
                                            <form className="overflow-y-auto"  encType='multipart/form-data'>
                                                <FormInput name="commentContent" label="" type="textarea" containerClass="w-full" className="form-input" rows={3} key="commentContent" value={commentForm?.content} errors={commentForm?.errors} onChange={(e) => updateComment('content', e.target.value)} />
                                                {/* <div className="mb-2">
                                                    {selectedCommentFiles.length > 0 && (
                                                        <div className="mt-4 flex items-center gap-2">
                                                            {selectedCommentFiles.map((file:any, index:number) => (
                                                                <div key={index} className="flex items-center  ">
                                                                    {file.preview && <img className="border rounded-md border-gray-200 p-1" src={file.preview} alt={file.name} width={40} />}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeCommentFile(index)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <i className="ri-close-line"></i>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div> */}
                                                <div className="flex items-center justify-end">


                                                    <div className="my-2 inline-block">
                                                        {/* <input
                                                            type="file"
                                                            multiple
                                                            onChange={handleCommentFileChange}
                                                            className="hidden"
                                                            id="fileInput"
                                                        />
                                                        <label htmlFor="fileInput" className="btn btn-link text-xl cursor-pointer">
                                                            <i className="ri-attachment-2"></i>
                                                        </label> */}
                                                        <button type="button" onClick={() => handleSendComment('comment')}  className="btn bg-primary text-white btn-sm">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* <div className="flex items-center justify-end">
                                                    <div className="mb-2 inline-block">
                                                        <button type="button" className="btn btn-link text-xl">
                                                            <i className="ri-attachment-2"></i>
                                                        </button>
                                                    </div>
                                                    <div className="mb-2 inline-block">
                                                        <button type="submit" className="btn bg-primary text-white btn-sm">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div> */}
                                                {/* {selectedCommentFiles.length > 0 && (
                                                    <div className="mt-4">
                                                    {selectedCommentFiles.map((file:any, index:number) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                        <span className="text-gray-600">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeCommentFile(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <i className="ri-close-line"></i>
                                                        </button>
                                                        </div>
                                                    ))}
                                                    </div>
                                                )} */}
                                            </form>
                                            {comments?.length > 0 ? (
                                                renderComments(comments)
                                            ): (
                                            <p className="font-light text-gray-500 dark:text-gray-400">
                                                No comments for this task.
                                            </p>
                                            )}
                                            {/* <div className="flex gap-5">
                                                <img src={avatar3} alt="" className="h-12 rounded-full" />
                                                <div className="w-full">
                                                    <h5 className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Jeremy Tomlinson</h5>
                                                    <p className="font-light">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

                                                    <div className="mt-5">
                                                        <div className="flex gap-5">
                                                            <img src={avatar4} alt="" className="h-12 rounded-full" />
                                                            <div className="w-full">
                                                                <h5 className="mb-2 text-gray-500 dark:text-gray-400 font-semibold">Thelma Fridley</h5>
                                                                <p className="font-light">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </Tab.Panel>
                                        <Tab.Panel className="transition-all duration-300 transform">
                                            {task?.media?.length > 0 ? (
                                                task?.media.map((file:any) => (
                                                <div
                                                    key={file.id}
                                                    className="border rounded-md border-gray-300 dark:border-gray-700 p-3 mb-2 flex justify-between"
                                                >
                                                    <div className="flex items-center gap-3">
                                                    {/* Display file type icon or thumbnail */}
                                                    {file.file_name.endsWith(".zip") ? (
                                                        <span className="flex items-center justify-center bg-primary text-white font-semibold rounded-md w-12 h-12">
                                                        .ZIP
                                                        </span>
                                                    ) : file.file_name.endsWith(".jpg") || file.file_name.endsWith(".png") ? (
                                                        <img
                                                        src={file.original_url}
                                                        alt={file.name}
                                                        className="h-12 w-12 rounded-md"
                                                        />
                                                    ) : file.file_name.endsWith(".mp4") ? (
                                                        <span className="flex items-center justify-center bg-secondary text-white font-semibold rounded-md w-12 h-12">
                                                        .MP4
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center justify-center bg-gray-500 text-white font-semibold rounded-md w-12 h-12">
                                                        ?
                                                        </span>
                                                    )}
                                                    {/* File details */}
                                                    <div>
                                                        <Link href={file.original_url} className="font-medium" target="_blank">
                                                        {file.name}
                                                        </Link>
                                                        {file.size && <p className="font-light">{file.size}</p>}
                                                    </div>
                                                    </div>
                                                    {/* Download link */}
                                                    <div className="flex justify-between items-center">
                                                    <Link href={file.original_url} target="_blank" className="btn btn-link">
                                                        <i className="ri-download-line text-lg"></i>
                                                    </Link>
                                                    </div>
                                                </div>
                                                ))
                                            ) : (
                                                <p className="font-light text-gray-500 dark:text-gray-400">
                                                No files uploaded for this task.
                                                </p>
                                            )}
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="text-center mt-2 font-medium">
                                    <Link href="" className="text-danger">
                                        Load more{' '}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalLayout>
                 {/* } */}


                 <ModalLayout
                    showModal={updateTaskModal}
                    toggleModal={() => toggleUpdateTaskModal(task)}
                    aria-hidden="true"
                    panelClassName="min-w-[768px]"
                    >
                     <div className="bg-white pointer-events-none relative w-auto -translate-y-5 transition-all duration-300 ease-in-out sm:max-w-2xl md:max-w-3xl sm:w-full h-full flex items-center rounded-md shadow-lg dark:bg-gray-800 sm:mx-auto">
                        <div className="pointer-events-auto relative flex w-full flex-col">
                            <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700 pt-8">
                                {/* <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                                Update Task
                                </h3> */}
                                <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                                    Update Task - {updateTaskForm?.data.title}
                                        {/* <span className={`inline-flex items-center gap-1.5 p-1 rounded-md text-xs font-medium ms-3 ${task?.priority === 'High' ? 'bg-danger/10 text-danger' : task?.priority === 'Medium' ? 'bg-warning/10 text-warning' : task?.priority === 'Low' ? 'bg-success/10 text-success' : ''}`}>{task?.priority}</span> */}
                                </h3>
                                <div className="mb-2 inline-block">

                                    <button type="button" onClick={() => toggleDescriptionModal(task)} className="btn btn-link text-xl">
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                    <button type="button" onClick={() => toggleDescriptionModal(task)} className="btn btn-link text-xl">
                                        <i className="ri-archive-drawer-fill"></i>
                                    </button>

                                </div>
                                <button
                                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
                                    onClick={() => toggleUpdateTaskModal(task)}
                                    type="button"
                                >
                                    <i className="ri-close-line text-xl"></i>
                                </button>
                            </div>

                            <form className="px-4 py-8 overflow-y-auto" onSubmit={handleUpdateTask} encType='multipart/form-data'>
                                {/* Task Title */}
                                <div className="mb-4">
                                    <FormInput name="title" label="Title" placeholder="Enter Title" type="text" containerClass="space-y-1.5 mb-6" className="form-input" key="title"  value={updateTaskForm?.data.title} errors={updateTaskForm?.errors} onChange={(e) => updateTaskForm.setData('title', e.target.value)} />

                                </div>

                                {/* Task Priority */}
                                <div className="mb-4">
                                    <FormInput name="priority" label="Priority" type="select" containerClass="space-y-1.5 mb-6" className="form-select" key="priority" value={updateTaskForm?.data.priority} errors={updateTaskForm?.errors} onChange={(e) => updateTaskForm.setData('priority', e.target.value)}>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </FormInput>

                                </div>

                                {/* Task Description */}
                                <div className="mb-4">
                                    <FormInput name="description" label="Description" type="textarea" containerClass="w-full space-y-1.5 mb-6" className="form-input" rows={3} key="description" value={updateTaskForm?.data.description} errors={updateTaskForm?.errors} onChange={(e) => updateTaskForm.setData('description', e.target.value)} />
                                </div>

                                {/* Dates */}
                                <div className="grid sm:grid-cols-2 gap-6 mb-4">
                                    <div className="col-md-6">
                                        <div className="space-y-1.5 mb-6 flex flex-col">
                                            <label htmlFor="task-priority" className="font-semibold text-gray-500">
                                                Due Date
                                            </label>
                                            <CustomDatepicker
                                                hideAddon
                                                dateFormat="yyyy-MM-dd"
                                                value={updateTaskForm?.data.dueDate || new Date()}
                                                inputClass="form-input"
                                                onChange={(date) => {
                                                    handleUpdateTaskDate(date)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Assignee */}
                                <div className="mb-4">
                                    <FormInput name="assignTo" label="Assign To" type="select" containerClass="space-y-1.5 mb-6" labelClassName="font-semibold text-gray-500" className="form-select" key="assignTo" value={updateTaskForm?.data.assignTo} errors={errors} onChange={(e) => updateTaskForm.setData('assignTo', e.target.value)}>
                                        {(assignees || []).map((assignee, idx) => (
                                            <option key={idx} value={assignee.id}>
                                                {assignee.fullname}
                                            </option>
                                        ))}
                                    </FormInput>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="task-assignees" className="block mb-2 text-sm font-medium text-gray-600">
                                        Assignees
                                    </label>
                                    <select
                                        id="task-assignees"
                                        className="form-select w-full"
                                        multiple
                                        defaultValue={task?.assignee_ids || []}
                                        onChange={(e) => {
                                            const selectedValues = Array.from(e.target.selectedOptions).map((option) => option.value);
                                            updateTaskForm.setData('assignees', selectedValues);
                                        }}
                                    >

                                        {(assignees || []).map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple users.</p>
                                </div>

                                <div className="mb-4">
                                    {/* <input type="file"
                                            name="files[]" multiple className="form-control" onChange={async (e) => { console.log(e.target.files); updateTaskForm.setData((datagg) => ({...datagg, files: e.target.files ? Array.from(e.target.files).map(x => x) : undefined}))}}/> */}
                                    {/* <input type="file" multiple className="form-control" onChange={(e) => handleFileChange(e)}/> */}
                                    <FileUploader icon="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200" text="Drop files here or click to upload." onFileUpload={handleTaskFileUpload}/>
                                    {task?.media?.map((file:any, index : number) => (
                                        // <div key={index}>
                                        <div
                                            key={file.id}
                                            className="border rounded-md border-gray-300 dark:border-gray-700 p-3 mb-2 flex justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                            {/* Display file type icon or thumbnail */}
                                            {file.file_name.endsWith(".zip") ? (
                                                <span className="flex items-center justify-center bg-primary text-white font-semibold rounded-md w-12 h-12">
                                                .ZIP
                                                </span>
                                            ) : file.file_name.endsWith(".jpg") || file.file_name.endsWith(".png") ? (
                                                <img
                                                src={file.original_url}
                                                alt={file.name}
                                                className="h-12 w-12 rounded-md"
                                                />
                                            ) : file.file_name.endsWith(".mp4") ? (
                                                <span className="flex items-center justify-center bg-secondary text-white font-semibold rounded-md w-12 h-12">
                                                .MP4
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center bg-gray-500 text-white font-semibold rounded-md w-12 h-12">
                                                ?
                                                </span>
                                            )}
                                            {/* File details */}
                                            <div>
                                                <Link href={file.original_url} className="font-medium" target="_blank">
                                                {file.name}
                                                </Link>
                                                {file.size && <p className="font-light">{file.size}</p>}
                                            </div>
                                            </div>
                                            {/* Download link */}
                                            <div className="flex justify-between items-center">
                                                <button onClick={(e) => {e.preventDefault(); deleteFile(file.id)}}>Delete</button>
                                            </div>
                                        </div>
                                        // </div>
                                    ))}

                                </div>
                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button type="submit" className="btn bg-primary text-white btn-sm">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalLayout>

            </VerticalLayout>
		</>
	)
}

export default KanbanApp



