<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabNote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LabNoteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $topicId = $request->query('topic_id');

        $notesQuery = LabNote::query()->latest();

        if (is_string($topicId) && $topicId !== '') {
            $notesQuery->where('topic_id', $topicId);
        }

        return response()->json($notesQuery->get());
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'topic_id' => ['required', 'string', 'max:120'],
            'title' => ['required', 'string', 'max:120'],
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $note = LabNote::create($payload);

        return response()->json($note, 201);
    }

    public function show(LabNote $labNote): JsonResponse
    {
        return response()->json($labNote);
    }

    public function update(Request $request, LabNote $labNote): JsonResponse
    {
        $payload = $request->validate([
            'topic_id' => ['sometimes', 'string', 'max:120'],
            'title' => ['sometimes', 'string', 'max:120'],
            'body' => ['sometimes', 'string', 'max:5000'],
        ]);

        $labNote->update($payload);

        return response()->json($labNote->fresh());
    }

    public function destroy(LabNote $labNote): JsonResponse
    {
        $labNote->delete();

        return response()->json(status: 204);
    }
}
