"use server";

import { revalidatePath } from "next/cache";
import {
  startWorkoutSession,
  updateWorkoutSession,
} from "@/app/_lib/api/fetch-generated";

export async function startWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
) {
  const result = await startWorkoutSession(workoutPlanId, workoutDayId);

  if (result.status !== 201 && result.status !== 409) {
    throw new Error(
      `error:${result.status} data:${JSON.stringify("data" in result ? result.data : null)}`,
    );
  }

  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}

export async function completeWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
  sessionId: string,
) {
  const result = await updateWorkoutSession(
    workoutPlanId,
    workoutDayId,
    sessionId,
    {
      completedAt: new Date().toISOString(),
    },
  );

  if (result.status !== 200) {
    throw new Error(
      `error:${result.status} data:${JSON.stringify("data" in result ? result.data : null)}`,
    );
  }

  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
}
