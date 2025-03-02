<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Task;
use App\Models\User;
use App\Models\Workspace;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use function Pest\Laravel\delete;

class BoardTaskController extends Controller
{
    public function index( Request $request)
    {
        $tasks = Task::with('assignees')->get();
        $id = $request->get('task');
        $task = Task::find($id);
        $activeTasks = Task::active()->get();
        $archivedTasks = Task::archived()->get();
        $assignees = User::all();
        // $
        // dd($tasks);
        return Inertia::render('board/index', [
            'title' => 'Task Board',
            'description' => 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
            'tasks' => $tasks,
            //load task with comments where parent_id is null and replies

            'task' =>
            // Inertia::defer(
                fn () => $request->has('task') ? $task?->load(['assignees','media','comments.user','comments.replies.user']) : null,
            // ),

            'assignees' =>
            // Inertia::defer(
                fn () => $request->has('task') ? $assignees : null
            // ),
        ]);
    }

    public function show($id, Request $request)
    {
        $task = Task::find($id);
        // dd($task);
        return Inertia::render('Tasks/Show', [
            'task' => Inertia::defer(
                fn () => $request->has('task') ? $task : null
            ),
            // 'descriptionModalData' => Inertia::lazy(fn () => $this->getModalData($id)),
        ]);
    }

    private function getModalData($id)
    {
        return [
            'title' => 'iOS App Home Page',
            'priority' => 'High',
            'description' => 'Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas quod perferendis!',
            'createDate' => '17 March 2023 1:00 PM',
            'dueDate' => '22 December 2023 1:00 PM',
            'assignees' => [
                ['name' => 'Tosha', 'avatar' => 'avatar1.png'],
                ['name' => 'Hooker', 'avatar' => null],
                ['name' => 'Brain', 'avatar' => 'avatar5.png'],
            ],
            'tabs' => [
                'comments' => [
                    [
                        'author' => 'Jeremy Tomlinson',
                        'avatar' => 'avatar3.png',
                        'message' => 'Cras sit amet nibh libero, in gravida nulla...',
                    ],
                    [
                        'author' => 'Thelma Fridley',
                        'avatar' => 'avatar4.png',
                        'message' => 'Cras purus odio, vestibulum in vulputate at...',
                    ],
                ],
                'files' => [
                    [
                        'name' => '-admin-design.zip',
                        'type' => 'zip',
                        'size' => '2.3 MB',
                        'url' => '/files/admin-design.zip',
                    ],
                    [
                        'name' => 'Dashboard-design.jpg',
                        'type' => 'image',
                        'size' => '3.25 MB',
                        'url' => '/files/dashboard-design.jpg',
                    ],
                    [
                        'name' => 'Admin-bug-report.mp4',
                        'type' => 'video',
                        'size' => '7.05 MB',
                        'url' => '/files/admin-bug-report.mp4',
                    ],
                ],
            ],
        ];
    }
    public function store(Request $request, Workspace $workspace, Board $board)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'description' => 'nullable|string',
            'dueDate' => 'nullable|date',
            'assignTo' => 'nullable|exists:users,id',
            'assignees' => 'nullable|array',
            'assignees.*' => 'exists:users,id',
            'created_by' => 'nullable|exists:users,id',
            'workspace_id' => 'nullable|exists:workspaces,id',
            'board_id' => 'nullable|exists:boards,id',

        ]);
        // dd($validated);
        $board->tasks()->create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'status' => $validated['status'] ?? 'Todo',
            'priority' => $validated['priority']?? 'Medium',
            'description' => $validated['description'],
            'assigned_to' => $validated['assignTo'],
            'due_date' => $validated['dueDate'] && Carbon::parse($validated['dueDate'])->format('Y-m-d H:i:s'),
            'assignTo' => $validated['assignTo'],
            'created_by' => $request->user()->id,
            'workspace_id' => $board->workspace_id,

        ]);

        // dd($task);
        return redirect()->back()->with('success', 'Task created successfully.');
    }

    public function updateTask(Request $request,Workspace $workspace, Board $board, $id)
    {
        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            // 'category' => 'required|string',
            'status' => 'required|string',
            'priority' => 'required|string',
            'description' => 'required|string',
            'dueDate' => 'nullable|date',
            'assignees' => 'nullable|array',
            'assignees.*' => 'exists:users,id',

        ]);

        $task = Task::findOrFail($id);

        $task->update([
            'title' => $validated['title'],
            // 'category' => $validated['category'],
            'status' => $validated['status'],
            'priority' => $validated['priority'],
            'description' => $validated['description'],
            'due_date' => Carbon::parse($validated['dueDate'])->format('Y-m-d H:i:s'),
        ]);

        $task->assignees()->sync($request->assignees);

        return redirect()->back()->with('success', 'Task updated successfully.');
    }

    public function updateTasks(Request $request,Workspace $workspace, Board $board)
    {
        $validated = $request->validate([
            'sourceId' => 'required|string',
            'destinationId' => 'nullable|string',
            'updatedState' => 'required|array',
        ]);

        $tempEnum = [
            'todoTasks' => 'Todo',
            'inprogressTasks' => 'Inprogress',
            'reviewTasks' => 'Review',
            'doneTasks' => 'Done',
        ];

        $sourceId = $validated['sourceId'];
        $destinationId = $validated['destinationId'] ?? null;
        $updatedState = $validated['updatedState'];
        // dd($sourceId, $destinationId, $updatedState);
        // Update tasks in the source list
        if (isset($updatedState[$sourceId])) {
            foreach ($updatedState[$sourceId] as $index => $task) {
                Task::where('id', $task['id'])->update(['status' => $tempEnum[$sourceId], 'order' => $index]);
            }
        }

        // Update tasks in the destination list (if applicable)
        if ($destinationId && isset($updatedState[$destinationId])) {
            foreach ($updatedState[$destinationId] as $index => $task) {
                Task::where('id', $task['id'])->update(['status' => $tempEnum[$destinationId], 'order' => $index]);
            }
        }

        return redirect()->back()->with(['message' => 'Tasks updated successfully!'], 200);
    }

    // public function serializeAssignees(User $user)
    // {
    //     return [
    //         'id' => $user->id,
    //         'title' => $user->name,
    //         'image' => $user->avatar,
    //         'isImage' => $user->avatar ? true : false,
    //     ];
    // }

    public function destroy(Request $request,Workspace $workspace, Board $board, $id)
    {

        // dd($request->all());
        $task = Task::findOrFail($id);

        // Delete the task and its relationships in the pivot table
        $task->assignees()->detach(); // Detach all related users
        $task->delete(); // Delete the task itself

        // Redirect the user to the index page
        // route('boards.index');


        return redirect()->route('workspaces.board.show',['workspace' => $workspace->id, 'board' => $board->id ,'deleted' => $id])->with('success', 'Task deleted successfully.');


    }



    public function deleteFile(Request $request,Workspace $workspace, Board $board,$mediaId)
    {
        $media = Media::findOrFail($mediaId);

        $media->delete();

        return redirect()->back()->with('success', 'File deleted successfully.');
        // return response()->json(['message' => 'File deleted successfully']);
    }

    public function uploadFile(Request $request,Workspace $workspace, Board $board, Task $task)
    {
        $request->validate([
            'file' => 'required|file|max:2048', // Adjust file validation rules as needed
        ]);

        // $task = Task::findOrFail($taskId);

        if ($request->hasFile('file')) {
            $task->addMedia($request->file('file'))->toMediaCollection('task_files');
        }

        return redirect()->back()->with('success', 'File uploaded successfully.');
        // return response()->json(['message' => 'File uploaded successfully', 'files' => $task->getMedia('task_files')]);
    }

    public function uploadFiles(Request $request,Workspace $workspace, Board $board, Task $task)
    {
        $request->validate([
            'files.*' => 'required|file|max:2048', // Validate each file
        ]);

        // $task = Task::findOrFail($taskId);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $task->addMedia($file)->toMediaCollection('task_files');
            }
        }

        return redirect()->back()->with('success', 'Files uploaded successfully.');
        // return response()->json([
        //     'message' => 'Files uploaded successfully',
        //     'files' => $task->getMedia('task_files'),
        // ]);
    }


    public function archive(Request $request,Workspace $workspace, Board $board, Task $task)
    {
        // dd($task);
        $task->archive();
        return redirect()->back()->with('success', 'Task archived successfully.');
        // return response()->json([
        //     'message' => 'Task archived successfully.',
        //     'task' => $task,
        // ]);
    }

    public function unarchive(Request $request,Workspace $workspace, Board $board,Task $task)
    {
        $task->unarchive();
        return redirect()->back()->with('success', 'Task unarchived successfully.');
        // return response()->json([
        //     'message' => 'Task unarchived successfully.',
        //     'task' => $task,
        // ]);
    }
}
