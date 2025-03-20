<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "description" => $this->description,
            "due" => $this->due_date,
            "priority" => $this->priority,
            "status" => $this->status,
            "category_id" => $this->category_id,
            "User" => new UserResource($this->whenLoaded("user"))
        ];
    }
}
