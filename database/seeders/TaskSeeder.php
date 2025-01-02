<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'id' => 1,
                'title' => 'iOS App home page',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Todo',
                'priority' => 'High',
                'due_date' => '18 Jul 2023',
                'category' => 'iOS',
                'comments' => 74,
                'user_avatar' => [
                    [
                        'id' => '1',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar1',
                    ],
                    [
                        'id' => '2',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar3',
                    ],
                    [
                        'id' => '3',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'K',
                        'textBg' => 'bg-success text-white',
                    ],
                    [
                        'id' => '4',
                        'isImage' => false,
                        'title' => 'More +',
                        'image' => '9+',
                        'textBg' => 'bg-primary text-white',
                    ],
                ],
            ],
            [
                'id' => 2,
                'title' => 'Topnav layout design',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Todo',
                'priority' => 'Medium',
                'due_date' => '15 Dec 2023',
                'category' => 'Attex',
                'comments' => 28,
                'user_avatar' => [
                    [
                        'id' => '5',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar2',
                    ],
                    [
                        'id' => '6',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar4',
                    ],
                ],
            ],
            [
                'id' => 3,
                'title' => 'Invite user to a project',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Todo',
                'priority' => 'Low',
                'due_date' => '11 Jul 2023',
                'category' => 'CRM',
                'comments' => 68,
                'user_avatar' => [
                    [
                        'id' => '7',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar5',
                    ],
                    [
                        'id' => '8',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar6',
                    ],
                    [
                        'id' => '9',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'M',
                        'textBg' => 'bg-info text-white',
                    ],
                ],
            ],
            [
                'id' => 4,
                'title' => 'Write a release note',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Inprogress',
                'priority' => 'Medium',
                'due_date' => '22 Jun 2023',
                'category' => 'Attex',
                'comments' => 17,
                'user_avatar' => [
                    [
                        'id' => '10',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar7',
                    ],
                    [
                        'id' => '11',
                        'isImage' => true,
                        'title' => 'Brain', // Brain
                        'image' => 'avatar8',
                    ],
                ],
            ],
            [
                'id' => 5,
                'title' => 'Enable analytics tracking',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Inprogress',
                'priority' => 'Low',
                'due_date' => '19 Jun 2023',
                'category' => 'CRM',
                'comments' => 48,
                'user_avatar' => [
                    [
                        'id' => '12',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar1',
                    ],
                    [
                        'id' => '13',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'K',
                        'textBg' => 'bg-warning text-white',
                    ],
                    [
                        'id' => '14',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar9',
                    ],
                ],
            ],
            [
                'id' => 6,
                'title' => 'Kanban board design',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Review',
                'priority' => 'High',
                'due_date' => '2 May 2023',
                'category' => 'CRM',
                'comments' => 65,
                'user_avatar' => [
                    [
                        'id' => '15',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar2',
                    ],
                    [
                        'id' => '16',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar4',
                    ],
                    [
                        'id' => '17',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'D',
                        'textBg' => 'bg-light text-black',
                    ],
                ],
            ],
            [
                'id' => 7,
                'title' => 'Code HTML email template',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Review',
                'priority' => 'Medium',
                'due_date' => '7 May 2023',
                'category' => 'CRM',
                'comments' => 106,
                'user_avatar' => [
                    [
                        'id' => '18',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar1',
                    ],
                    [
                        'id' => '19',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar1',
                    ],
                    [
                        'id' => '20',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar5',
                    ],
                ],
            ],
            [
                'id' => 8,
                'title' => 'Brand logo design',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Review',
                'priority' => 'Medium',
                'due_date' => '8 Jul 2023',
                'category' => 'Design',
                'comments' => 95,
                'user_avatar' => [
                    [
                        'id' => '21',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'M',
                        'textBg' => 'bg-primary text-white',
                    ],
                    [
                        'id' => '22',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'A',
                        'textBg' => 'bg-info text-white',
                    ],
                    [
                        'id' => '23',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar1',
                    ],
                ],
            ],
            [
                'id' => 9,
                'title' => 'Improve animation loader',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Review',
                'priority' => 'High',
                'due_date' => '22 Jul 2023',
                'category' => 'CRM',
                'comments' => 39,
                'user_avatar' => [
                    [
                        'id' => '24',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar2',
                    ],
                    [
                        'id' => '25',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar4',
                    ],
                ],
            ],
            [
                'id' => 10,
                'title' => 'Dashboard design',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
                'status' => 'Done',
                'priority' => 'Low',
                'due_date' => '16 Jul 2023',
                'category' => 'Attex',
                'comments' => 287,
                'user_avatar' => [
                    [
                        'id' => '26',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar1',
                    ],
                    [
                        'id' => '27',
                        'isImage' => true,
                        'title' => 'Brain',
                        'image' => 'avatar3',
                    ],
                    [
                        'id' => '28',
                        'isImage' => true,
                        'title' => 'Tosha',
                        'image' => 'avatar8',
                    ],
                    [
                        'id' => '29',
                        'isImage' => false,
                        'title' => 'Hooker',
                        'image' => 'K',
                        'textBg' => 'bg-danger text-white',
                    ],
                ],
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }

        // Task::factory(20)->create();
    }
}
