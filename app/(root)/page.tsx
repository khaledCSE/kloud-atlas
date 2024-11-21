import Chart from "@/components/dashboard/statistics/Chart";
import FileTypeSummary from "@/components/dashboard/statistics/FileTypeSummary";
import RecentFiles from "@/components/dashboard/statistics/RecentFiles";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getUsageSummary } from "@/lib/utils";
import { FileMeta } from "@/types";
import { redirect } from "next/navigation";
import { Models } from "node-appwrite";

export default async function Home() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    console.log('approaching dashboard without login');

    redirect('/sign-in')
  }

  const [files, totalSpaceUsed] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]) as [Models.DocumentList<Models.Document>, any]

  const usageSummary: FileMeta[] = getUsageSummary(totalSpaceUsed);

  return (
    <div>
      <section className="flex gap-10">
        <div className="flex-1">
          <Chart used={totalSpaceUsed.used} />
          <FileTypeSummary usageSummary={usageSummary} />
        </div>
        <RecentFiles files={files} />
      </section>
    </div>
  );
}
