import type { Metadata } from "next";
import ContactLines from "@/components/ContactLines";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy | Bhushan Ki Dukaan" };

export default function CookiePolicy() {
  return (
    <LegalPage title="Cookie Policy">
      <p>Cookies and similar browser storage are small pieces of data a website keeps on your device. Here is what we use.</p>

      <h2>Essential (always on)</h2>
      <ul>
        <li>Your cookie choice, so we don&apos;t ask again.</li>
        <li>Keeping staff signed in to our admin area.</li>
        <li>Security protection from our hosting provider (Cloudflare).</li>
      </ul>
      <p>The site cannot work properly without these, so they cannot be switched off.</p>

      <h2>Analytics (only if you allow)</h2>
      <p>
        We use Cloudflare Web Analytics to count visits and see which pages are popular. It does not use cookies, does not track you
        across other websites and does not build a profile of you. We still only load it if you choose &quot;Accept analytics&quot;.
      </p>

      <h2>Marketing</h2>
      <p>We do not use advertising or tracking cookies at the moment. If we add them, we will update this page and ask for your consent first.</p>

      <h2>Change your choice</h2>
      <p>
        <CookieSettingsButton />
      </p>

      <h2>Contact</h2>
      <ContactLines />
    </LegalPage>
  );
}
