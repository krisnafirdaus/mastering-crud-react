"use client"

import Link from "next/link";
import { useState } from "react";
import { CourseProgressProvider, useCourseProgress } from "@/context/course-progress-context";
import { useCourseOutline } from "@/hooks/use-course-outline";