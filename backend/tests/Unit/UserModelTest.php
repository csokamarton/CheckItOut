<?php

namespace Tests\Unit;

use App\Models\Task;
use App\Models\User;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use PHPUnit\Framework\TestCase;

class UserModelTest extends TestCase
{
    public function test_tasks_relationship_returns_has_many()
    {
        $user = new User();

        $this->assertInstanceOf(HasMany::class, $user->tasks());
        $this->assertEquals('user_id', $user->tasks()->getForeignKeyName());
        $this->assertEquals('id', $user->tasks()->getLocalKeyName());
    }
    public function test_schedules_relationship_returns_has_many()
    {
        $user = new User();

        $this->assertInstanceOf(HasMany::class, $user->schedules());
    }
}
