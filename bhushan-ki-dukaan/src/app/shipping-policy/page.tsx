import type { Metadata } from "next";
import ContactLines from "@/components/ContactLines";
import LegalPage from "@/components/LegalPage";
import { ADDRESS } from "@/lib/shop";
import { POLICY } from "@/lib/policies";

export const metadata: Metadata = { title: "Delivery & Rental Policy | Bhushan Ki Dukaan" };

export default function ShippingPolicy() {
  return (
    <LegalPage title="Delivery & Rental Policy">
      <h2>Studio pickup</h2>
      <p>You can collect your order from our studio at {ADDRESS}, during opening hours. We will message you when it is ready.</p>

      <h2>Delivery</h2>
      <ul>
        <li>We deliver within {POLICY.deliveryArea}.</li>
        <li>Delivery usually takes {POLICY.deliveryDays} after the order is confirmed. For rentals we agree an exact date and time with you.</li>
        <li>Delivery charges, if any, are told to you before you confirm the order.</li>
        <li>Please check the items when they arrive and tell us at once if anything is missing or damaged.</li>
        <li>For delivery outside our area, message us and we will tell you if it is possible and what it costs.</li>
      </ul>

      <h2>Rental returns</h2>
      <ul>
        <li>Return rentals to the studio, or hand them to our staff on the agreed collection date.</li>
        <li>Late returns are charged at {POLICY.lateReturnNote}.</li>
      </ul>

      <h2>Questions</h2>
      <ContactLines />
    </LegalPage>
  );
}
