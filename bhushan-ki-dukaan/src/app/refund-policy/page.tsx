import type { Metadata } from "next";
import ContactLines from "@/components/ContactLines";
import LegalPage from "@/components/LegalPage";
import { POLICY } from "@/lib/policies";

export const metadata: Metadata = { title: "Refund & Cancellation Policy | Bhushan Ki Dukaan" };

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund & Cancellation Policy">
      <h2>Rentals</h2>
      <ul>
        <li>Cancel at least {POLICY.fullRefundHours} hours before the agreed pickup or delivery time for a full refund.</li>
        <li>Cancellations after that get a {POLICY.lateCancelRefundPercent}% refund of the rent, as the costume was held for you.</li>
        <li>No refund once the costume has been picked up or delivered.</li>
        <li>The security deposit is refunded within {POLICY.depositRefundDays} working days after the costume is returned and checked, minus any damage or late-return charges.</li>
      </ul>

      <h2>Purchases</h2>
      <ul>
        <li>You can cancel a purchase for a full refund before it is dispatched or collected.</li>
        <li>If you receive a damaged, defective or wrong item, tell us within {POLICY.returnDays} days with photos. We will replace it or refund you in full.</li>
        <li>Items made or altered to your measurements (bespoke / made-to-measure) cannot be returned unless they are defective.</li>
        <li>For hygiene reasons, worn items cannot be returned.</li>
      </ul>

      <h2>Event bookings</h2>
      <ul>
        <li>Cancellation terms for events are written in your quote, as they depend on what has been arranged and paid to suppliers.</li>
        <li>If we have to cancel, you get a full refund of everything paid.</li>
      </ul>

      <h2>How refunds are paid</h2>
      <p>
        Approved refunds go back to your original payment method within {POLICY.refundDays} working days. Your bank may take a few more days
        to show it. Cash payments are refunded by UPI or bank transfer.
      </p>

      <h2>To cancel or ask for a refund</h2>
      <p>Message or call us with your name and order details:</p>
      <ContactLines />
    </LegalPage>
  );
}
