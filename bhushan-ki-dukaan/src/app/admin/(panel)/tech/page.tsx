import ComingSoon from "@/components/admin/ComingSoon";
import { requireUser } from "@/lib/auth";

export default async function TechPage() {
  await requireUser("tech");
  return (
    <ComingSoon
      title="Tech"
      subtitle="Site health, analytics and SOPs."
      items={[
        "Website visits from Cloudflare Web Analytics",
        "Health check: database, payments and messaging status",
        "Editable SOP documents",
      ]}
    />
  );
}
