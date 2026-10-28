import type { Metadata } from "next";
import Link from "next/link";
import ContactLines from "@/components/ContactLines";
import LegalPage from "@/components/LegalPage";
import { BUSINESS } from "@/lib/policies";

export const metadata: Metadata = { title: "Privacy Policy | Bhushan Ki Dukaan" };

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        {BUSINESS.legalName} (&quot;we&quot;, &quot;us&quot;) runs this website to rent and sell traditional costumes and to manage events in{" "}
        {BUSINESS.city}, {BUSINESS.state}. This policy explains what personal data we collect, why, and the choices you have. We follow the
        Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Details you give us:</strong> your name, phone number, event type, date and location when you book a consultation, and the items in your bag when you place an order or rental request.</li>
        <li><strong>Order and payment details:</strong> what you ordered, amounts, and delivery address. Online payments are handled by our payment partner (Razorpay); we never see or store your full card, UPI PIN or bank login.</li>
        <li><strong>Messages:</strong> chats with us on WhatsApp, phone calls and SMS, including one-time passwords (OTPs) sent to verify your number.</li>
        <li><strong>Job applications:</strong> details you send when applying for a job or internship.</li>
        <li><strong>Website usage:</strong> pages visited, device and browser type and approximate location, only if you allow analytics. See our <Link href="/cookie-policy">Cookie Policy</Link>.</li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To confirm and deliver your order, rental or event booking, and to contact you about it.</li>
        <li>To take payments, issue GST invoices and keep records the law requires.</li>
        <li>To verify your phone number and prevent fraud.</li>
        <li>To improve the website and our service, using anonymous usage statistics.</li>
        <li>To send offers only if you have agreed; you can opt out at any time by telling us.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We do not sell your data. We share only what is needed with:</p>
      <ul>
        <li>Razorpay, to process payments.</li>
        <li>WhatsApp (Meta) and our SMS/OTP provider, to message you.</li>
        <li>Our hosting, database and analytics providers, who store data for us under contract.</li>
        <li>Delivery staff, for your name, phone and address on delivery orders.</li>
        <li>Government or courts, when the law requires it.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep order and invoice records for as long as tax law requires (currently at least 8 years under GST rules). Other details are
        kept only as long as needed for the purpose above, then deleted.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete your personal data, withdraw your consent, or raise a complaint. Contact us using the details
        below and we will reply within 30 days.
        {BUSINESS.grievanceOfficer && <> Our grievance officer is {BUSINESS.grievanceOfficer}.</>}
      </p>

      <h2>Security</h2>
      <p>We use secure (HTTPS) connections and limit access to your data to staff who need it. No system is perfectly secure, so please tell us at once if you notice anything wrong.</p>

      <h2>Children</h2>
      <p>Orders for children&apos;s costumes must be placed by a parent or guardian.</p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows the latest version.</p>

      <h2>Contact</h2>
      <ContactLines />
    </LegalPage>
  );
}
