<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CourseOutlineController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'title' => 'Mastering Advanced React Concepts',
            'subtitle' => 'Context and Custom Hooks',
            'description' => 'This lab pairs a Laravel API with a Next.js interface to practice global state, reusable hooks, and data-driven UI patterns.',
            'endpoint' => url('/api/course-outline'),
            'studyLoop' => [
                'Read the lesson outline from Laravel.',
                'Track active topics and completion in a React context.',
                'Reuse custom hooks for persistence and remote fetching.',
                'Reflect on patterns in the notes panel.',
            ],
            'topics' => [
                [
                    'id' => 'context-basics',
                    'title' => 'Context as shared state',
                    'summary' => 'Use context when multiple nested components need the same data without prop drilling.',
                    'focus' => 'Provider boundaries, value shape, and update frequency.',
                ],
                [
                    'id' => 'custom-hooks',
                    'title' => 'Custom hooks for reuse',
                    'summary' => 'Extract repeated logic into hooks that compose state, effects, and derived values.',
                    'focus' => 'Naming, dependency management, and API clarity.',
                ],
                [
                    'id' => 'integration',
                    'title' => 'Connecting UI to Laravel',
                    'summary' => 'Fetch the outline from the backend and let the frontend react to live course data.',
                    'focus' => 'Loading states, error states, and data ownership.',
                ],
            ],
            'checkpoints' => [
                'Build a progress tracker backed by context.',
                'Persist the selected topic with a reusable hook.',
                'Load backend content from the Laravel endpoint.',
            ],
        ]);
    }
}