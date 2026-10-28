import type { Metadata } from "next";
import Link from "next/link";
import ContactLines from "@/components/ContactLines";
import LegalPage from "@/components/LegalPage";
import { BUSINESS, POLICY } from "@/lib/policies";

export const metadata: Metadata = { title: "Terms & Conditions | Bhushan Ki Dukaan" };

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        These terms apply when you use this website or rent, buy or book anything from {BUSINESS.legalName}. By placing an order or booking
        you agree to them.
      </p>

      <h2>Orders and prices</h2>
      <ul>
        <li>All prices are in Indian Rupees and include GST unless stated otherwise.</li>
        <li>An order or rental is confirmed only after we confirm availability and size with you and, where required, receive payment.</li>
        <li>Photos are for reference; handmade and handloom items can vary slightly in colour and pattern.</li>
        <li>If a price or listing is shown by mistake, we may cancel the order and refund any amount paid in full.</li>
      </ul>

      <h2>Rentals</h2>
      <ul>
        <li>Rental price is per day unless stated. The rental period starts on the pickup or delivery date we agree.</li>
        <li>Rentals may need {POLICY.rentalDepositNote}. It is returned within {POLICY.depositRefundDays} working days after the costume is returned and checked.</li>
        <li>Please return costumes clean of food or makeup stains, with all accessories. Repair or cleaning costs for damage beyond normal use, or the replacement value for lost items, may be taken from the deposit.</li>
        <li>Late returns are charged at {POLICY.lateReturnNote}.</li>
        <li>Do not alter, cut or stitch rented costumes.</li>
      </ul>

      <h2>Event management</h2>
      <ul>
        <li>An event booking is confirmed after an advance of {POLICY.eventAdvancePercent}% of the agreed quote. The balance is due as per the quote.</li>
        <li>The final scope, items and price are as written in the quote we share with you.</li>
        <li>We are not responsible for delays caused by venue rules, weather, power cuts or other events outside our control, but we will do our best to help.</li>
      </ul>

      <h2>Payments</h2>
      <p>Online payments are processed securely by Razorpay. We may also accept UPI, cash or bank transfer at our studio.</p>

      <h2>Cancellations and refunds</h2>
      <p>See our <Link href="/refund-policy">Refund & Cancellation Policy</Link>.</p>

      <h2>Use of this website</h2>
      <p>Do not misuse the website, try to break its security, or copy its content or photos without permission.</p>

      <h2>Liability</h2>
      <p>
        Our total liability for any order is limited to the amount you paid for that order. Nothing in these terms limits rights you have
        under the Consumer Protection Act, 2019.
      </p>

      <h2>Law and disputes</h2>
      <p>These terms are governed by the laws of India. Courts in {BUSINESS.city}, {BUSINESS.state} have jurisdiction.</p>

      <h2>Contact</h2>
      <ContactLines />
    </LegalPage>
  );
}
