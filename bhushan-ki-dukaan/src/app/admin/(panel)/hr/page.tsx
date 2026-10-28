import ComingSoon from "@/components/admin/ComingSoon";
import { requireUser } from "@/lib/auth";

export default async function HrPage() {
  await requireUser("hr");
  return (
    <ComingSoon
      title="HR & Careers"
      subtitle="Jobs, internships and part-time roles."
      items={[
        "Create and edit job posts shown on a public /careers page",
        "Applications inbox with status per applicant",
        "Staff accounts and section access",
      ]}
    />
  );
}
