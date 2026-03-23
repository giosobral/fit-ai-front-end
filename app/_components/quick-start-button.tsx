"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { quickStartWorkoutAction } from "@/app/_actions";

interface QuickStartButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
}

export function QuickStartButton({
  workoutPlanId,
  workoutDayId,
}: QuickStartButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleQuickStart = () => {
    startTransition(async () => {
      await quickStartWorkoutAction(workoutPlanId, workoutDayId);
    });
  };

  return (
    <Button
      onClick={handleQuickStart}
      disabled={isPending}
      className="rounded-full px-4 py-2 font-heading text-sm font-semibold"
    >
      {isPending ? "Iniciando..." : "Bora!"}
    </Button>
  );
}
