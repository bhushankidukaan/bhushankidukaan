import type { Metadata } from "next";
import ContactLines from "@/components/ContactLines";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Contact Us | Bhushan Ki Dukaan" };

export default function Contact() {
  return (
    <LegalPage title="Contact Us">
      <p>For orders, rentals, event bookings, refunds or any complaint, reach us here. We reply on WhatsApp fastest.</p>
      <ContactLines />
      <h2>Visit the studio</h2>
      <p>Come and see the fabrics, try on rentals, or plan your event with our team in person.</p>
    </LegalPage>
  );
}
