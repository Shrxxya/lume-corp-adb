// /lib/pricing.js

export function calculateQuotation(summaryData) {
  const totalBudget = Number(summaryData.budget || 0); // in Lakhs

  // Base % fee (industry-style tiered pricing)
  let basePercent = 0.12; // 12%

  if (totalBudget > 50) basePercent = 0.08;
  else if (totalBudget > 20) basePercent = 0.10;

  // Complexity multipliers
  let complexityMultiplier = 1;

  if (summaryData.guestCount > 300) complexityMultiplier += 0.1;
  if (summaryData.vendors.length > 4) complexityMultiplier += 0.1;
  if (summaryData.timeline.length > 6) complexityMultiplier += 0.05;

  // Category-based weighting
  const premiumCategories = ["decor", "Entertainment", "tech"];
  const premiumLoad = summaryData.budgetBreakdown?.reduce((acc, item) => {
    if (premiumCategories.includes(item.category)) {
      return acc + item.amount;
    }
    return acc;
  }, 0) || 0;

  const premiumMultiplier = 1 + premiumLoad / 200; 
  // (if 50% budget in premium → +0.25)

  const serviceFee =
    totalBudget * basePercent * complexityMultiplier * premiumMultiplier;

  const gst = serviceFee * 0.18;

  return {
    basePercent,
    serviceFee: Number(serviceFee.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    total: Number((serviceFee + gst).toFixed(2)),
  };
}