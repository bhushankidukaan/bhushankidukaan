import { PageTitle } from "@/components/admin/ui";
import WebsiteTabs from "@/components/admin/WebsiteTabs";
import { requireUser } from "@/lib/auth";

export default async function WebsiteLayout({ children }: LayoutProps<"/admin/website">) {
  await requireUser("website");
  return (
    <>
      <PageTitle title="Website" subtitle="Changes show on the live homepage as soon as you save." />
      <WebsiteTabs />
      {children}
    </>
  );
}
