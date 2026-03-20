import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers, cookies } from "next/headers";
import { getHomeData, getUserTrainData } from "@/app/_lib/api/fetch-generated";
import dayjs from "dayjs";
import { Chat } from "@/app/_components/chat";

export default async function OnboardingPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const timezone = (await cookies()).get("timezone")?.value;
  const [homeData, trainData] = await Promise.all([
    getHomeData(dayjs().format("YYYY-MM-DD"), { timezone }),
    getUserTrainData(),
  ]);

  if (
    homeData.status === 200 &&
    trainData.status === 200 &&
    homeData.data.activeWorkoutPlanId &&
    trainData.data
  ) {
    redirect("/");
  }

  return (
    <Chat embedded initialMessage="Quero começar a melhorar minha saúde!" />
  );
}
