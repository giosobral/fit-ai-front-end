"use server";

import { redirect } from "next/navigation";
import { startWorkoutSession } from "@/app/_lib/api/fetch-generated";

export async function quickStartWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
) {
  await startWorkoutSession(workoutPlanId, workoutDayId);
  redirect(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}
