<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->first_name . ' ' . $this->last_name,
            'code' => $this->code,
            'role' => $this->role,
           
            'rating_exams' => $this->whenLoaded('rating_exams'),
        ];
    }
}
