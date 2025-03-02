// dummy data
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { TaskTypes } from './data'

interface TaskItemProps {
	task: TaskTypes
	toggleDescriptionModal: () => void
}

const TaskItem = ({ task, toggleDescriptionModal }: TaskItemProps) => {
	return (
		<>
			<div className="p-3">
				<div className="flex justify-between items-center">
					<small>{task.due_date_iso}</small>
					<span
						className={`inline-flex items-center gap-1.5 px-1 rounded-md text-xs font-medium
                        ${task.priority === 'High' ? 'bg-danger/10 text-danger' : task.priority === 'Medium' ? 'bg-warning/10 text-warning' : task.priority === 'Low' ? 'bg-success/10 text-success' : ''}`}
					>
						{task.priority}
					</span>
				</div>
				<h5 onClick={toggleDescriptionModal} className="my-2">
					<span className="text-sm text-gray-700 dark:text-slate-400 font-medium">{task.title}</span>
				</h5>
				{/* <p className="space-x-3"> */}
                <div className="flex items-center justify-between">
					{/* <span className="text-nowrap mb-2">
						<i className="ri-briefcase-2-line text-gray-500 dark:text-gray-400"></i> {task.category}
					</span>
					&nbsp; */}
					{/* <span className="text-nowrap mb-2">
						<i className="ri-discuss-line text-gray-500 dark:text-gray-400"></i>
						<b className="text-gray-500 dark:text-gray-400">&nbsp;{task.comment_count}</b>
					</span> */}
                    {/* <div className="mt-1"> */}
                    {/* <span className="text-nowrap mb-2"> */}
                        <div className="flex items-center">
                            {(task.assignees || []).map((avatar : any, idx: number) => (
                                <Tippy content={avatar.first_name} key={idx}>
                                    <div className="-me-3">{true? <img src={avatar.avatar_img || avatar.avatar} alt={avatar.first_name} className="rounded-full h-7 w-7 hover:-translate-y-0.5 transition-all duration-200" /> : <div className={`${avatar.textBg} font-medium flex items-center justify-center rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200`}>{avatar.image}</div>}</div>
                                </Tippy>
                            ))}
                        </div>
                    <span className="text-nowrap mb-2">
						<i className="ri-discuss-line text-gray-500 dark:text-gray-400"></i>
						<b className="text-gray-500 dark:text-gray-400">&nbsp;{task.comment_count}</b>
					</span>
                    {/* </span> */}
				    {/* </div> */}
				{/* </p> */}
                </div>

                {/* <div className="flex items-center px-3">
                            {(task.assignees || []).map((avatar : any, idx: number) => (
                                <Tippy content={avatar.first_name} key={idx}>
                                    <div className="-me-3">{true? <img src={avatar.avatar_img || avatar.avatar} alt={avatar.first_name} className="rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200" /> : <div className={`${avatar.textBg} font-medium flex items-center justify-center rounded-full h-8 w-8 hover:-translate-y-0.5 transition-all duration-200`}>{avatar.image}</div>}</div>
                                </Tippy>
                            ))}
                        </div> */}
			</div>
		</>
	)
}

export default TaskItem
