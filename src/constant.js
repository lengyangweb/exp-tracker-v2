export const CATEGORY_ALIASES = {
  bills: 'debt',
  food: 'groceries',
};

export const HISTORY_CATEGORIES = [
  { label: 'Salary', value: 'salary', description: 'Regular pay from employment or other income.' },
  { label: 'Groceries', value: 'groceries', description: 'Everyday groceries, household staples, and pantry essentials.' },
  { label: 'Rent', value: 'rent', description: 'Monthly rent or housing payments for a residence.' },
  { label: 'Debt', value: 'debt', description: 'Credit card balances, loans, and recurring debt obligations.' },
  { label: 'Utilities', value: 'utilities', description: 'Electricity, water, gas, and household utility costs.' },
  { label: 'Subscription', value: 'subscription', description: 'Streaming, software, memberships, and recurring services.' },
  { label: 'Entertainment', value: 'entertainment', description: 'Movies, gaming, hobbies, events, and leisure spending.' },
  { label: 'Miscellaneous', value: 'miscellaneous', description: 'Small or irregular expenses that do not fit a specific category.' },
  { label: 'Dining', value: 'dining', description: 'Restaurants, cafes, takeout, and meal delivery purchases.' },
  { label: 'Transportation', value: 'transportation', description: 'Fuel, transit fares, parking, rideshares, and commuting costs.' },
  { label: 'Phone', value: 'phone', description: 'Mobile phone plans, telecom charges, and device-related bills.' },
  { label: 'Internet', value: 'internet', description: 'Home internet access and connectivity service fees.' },
  { label: 'Insurance', value: 'insurance', description: 'Health, auto, home, life, and other insurance premiums.' },
];

export function normalizeCategoryValue(category) {
  const normalized = String(category ?? '').trim().toLowerCase();
  return CATEGORY_ALIASES[normalized] || normalized || 'miscellaneous';
}

export function getCategoryLabel(category) {
  const normalizedValue = normalizeCategoryValue(category);
  const match = HISTORY_CATEGORIES.find((item) => item.value === normalizedValue);
  return match?.label ?? 'Miscellaneous';
}

export function getCategoryDescription(category) {
  const normalizedValue = normalizeCategoryValue(category);
  const match = HISTORY_CATEGORIES.find((item) => item.value === normalizedValue);
  return match?.description ?? 'Miscellaneous expenses and irregular out-of-pocket costs.';
}