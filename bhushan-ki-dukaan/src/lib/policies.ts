// Business details and policy rules used by the legal pages.
// Values marked CONFIRM are sensible defaults - check them before going live.
export const BUSINESS = {
  name: "Bhushan Ki Dukaan",
  legalName: "Bhushan Ki Dukaan", // CONFIRM: name exactly as on the GST certificate
  gstin: "", // CONFIRM: fill in to show it on the policy and contact pages
  email: "", // CONFIRM: the Bhushan Ki Dukaan Gmail, for policy and grievance contact
  grievanceOfficer: "", // CONFIRM: person who handles privacy / complaint requests
  city: "Belagavi",
  state: "Karnataka",
  hours: "Mon – Sun, 10:00 AM – 9:00 PM",
};

export const POLICY = {
  lastUpdated: "28 October 2026",
  // Rentals
  rentalDepositNote: "a refundable security deposit, shown at the time of booking", // CONFIRM amount rule
  depositRefundDays: 7, // CONFIRM: working days to refund the deposit after return
  lateReturnNote: "one extra day's rent for each day late", // CONFIRM
  // Cancellations
  fullRefundHours: 48, // CONFIRM: cancel this many hours before pickup/delivery for a full refund
  lateCancelRefundPercent: 50, // CONFIRM: refund % for later cancellations
  refundDays: 7, // CONFIRM: working days for refunds to reach the original payment method
  // Purchases
  returnDays: 3, // CONFIRM: days to report a defect or wrong item on purchases
  // Delivery
  deliveryArea: "Belagavi city and nearby areas", // CONFIRM
  deliveryDays: "1–3 working days", // CONFIRM
  // Events
  eventAdvancePercent: 30, // CONFIRM: advance to confirm an event booking
};
