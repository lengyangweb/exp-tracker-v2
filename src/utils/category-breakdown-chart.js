import { getCategoryLabel, normalizeCategoryValue } from "@/constant";

const fillColor = {
  salary: "#86efac",
  groceries: "#fde047",
  rent: "#93c5fd",
  debt: "#d8b4fe",
  utilities: "#fdba74",
  subscription: "#f9a8d4",
  entertainment: "#67e8f9",
  dining: "#fca5a5",
  transportation: "#86efac",
  phone: "#c4b5fd",
  internet: "#93c5fd",
  insurance: "#fbbf24",
  miscellaneous: "#dbd3d1",
};

function normalizeCategoryName(category) {
  return normalizeCategoryValue(category);
}

function getCategoryChartLabel(category) {
  return getCategoryLabel(category);
}

/**
 * @param {{category: string; amount: number}[]} breakdown
 * @returns {[]}
 */
export function mappedChartData(breakdown) {
  return breakdown.reduce((acc, row) => {
    const normalizedCategory = normalizeCategoryName(row.category);

    return [
      ...acc,
      {
        category: getCategoryLabel(row.category),
        value: normalizedCategory,
        amount: row.amount,
        fill: fillColor[normalizedCategory] ?? fillColor.miscellaneous,
      },
    ];
  }, []);
}

/**
 * @param {{category: string; amount: number}[]} breakdown
 * @returns {Record<string, {label:string; color: string;}>}
 */
export function getChartConfig(breakdown) {
  return breakdown.reduce((acc, row) => {
    const normalizedCategory = normalizeCategoryName(row.category);
    const label = getCategoryLabel(row.category);

    return {
      ...acc,
      [normalizedCategory]: {
        label,
        color: fillColor[normalizedCategory] ?? fillColor.miscellaneous,
      },
    };
  }, { amounts: { label: "Amounts", color: "#ffffff" } });
}
