import ComingSoon from "@/components/admin/ComingSoon";
import { requireUser } from "@/lib/auth";

export default async function MarketingPage() {
  await requireUser("marketing");
  return (
    <ComingSoon
      title="Marketing"
      subtitle="Campaign performance."
      items={[
        "Meta (Facebook / Instagram) ad campaigns: spend, reach, clicks, cost per lead",
        "Leads per campaign, matched with the Sales section",
        "Needs a Meta Business system-user access token",
      ]}
    />
  );
}
