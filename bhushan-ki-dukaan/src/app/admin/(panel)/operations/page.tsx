import ComingSoon from "@/components/admin/ComingSoon";
import { requireUser } from "@/lib/auth";

export default async function OperationsPage() {
  await requireUser("operations");
  return (
    <ComingSoon
      title="Operations"
      subtitle="Order fulfilment and follow-ups."
      items={[
        "Confirmed orders and rentals with pickup, delivery and return dates",
        "Deposit received / refunded tracking",
        "Overdue returns and today's follow-up list",
      ]}
    />
  );
}
