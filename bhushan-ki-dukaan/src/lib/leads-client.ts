export type LeadInput = {
  kind: "booking" | "order" | "enquiry";
  name?: string;
  phone?: string;
  details: Record<string, unknown>;
};

/**
 * Saves a website inquiry to the CRM. Fire-and-forget: WhatsApp opens straight away,
 * and keepalive lets the request finish even if the visitor switches apps.
 */
export function saveLead(lead: LeadInput) {
  fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    keepalive: true,
  }).catch(() => {
    // The WhatsApp message still reaches the shop, so a failed save is not shown to the visitor
  });
}
