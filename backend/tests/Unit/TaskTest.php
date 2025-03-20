<?php

namespace Tests\Unit;

use App\Http\Controllers\TaskController;
use App\Models\User;
use Mockery;
use PHPUnit\Framework\TestCase;

use function Laravel\Prompts\table;

class TaskTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_return_zero_task_when_no_task_today(): void
    {
        $mockUser = Mockery::mock(User::class);

        $mockUser->shouldReceive('load')->with('tasks')->andReturnSelf();
        $mockUser->shouldReceive('only')->with('tasks')->andReturn([
            'tasks' => collect([
                [
                    "id" => 1,
                    "description" => "Nagyon Fontos Feladat",
                    "due_date" => today()->addDay(),
                    "priority" => 10,
                    "status" => "új",
                    "user_id" => 1,
                    "category_id" => 7
                ],
                [
                    "id" => 1,
                    "description" => "Nagyon Fontos Feladat",
                    "due_date" => today()->subDay(),
                    "priority" => 10,
                    "status" => "új",
                    "user_id" => 1,
                    "category_id" => 7
                ]
            ])
        ]);
        
        $controller = new TaskController();
        $return = $controller->todaysTasks($mockUser);

        $this->assertEmpty($return);
    }
}
