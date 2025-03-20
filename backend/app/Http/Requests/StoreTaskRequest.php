<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "description" => ["max:255", "nullable"],
            "due_date" => ["date", "after:today"],
            "priority" => ["integer", "min:1", "max:10"],
            "user_id" => ["exists:users,id"],
            "category_id" => ["exists:categories,id"]
        ];
    }
}
