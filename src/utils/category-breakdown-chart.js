const fillColor = {
  salary: "#86efac",          // green-300
  food: "#fde047",            // yellow-300
  rent: "#93c5fd",            // blue-300
  bills: "#d8b4fe",           // purple-300
  utilities: "#fdba74",       // orange-300
  subscription: "#f9a8d4",    // pink-300
  entertainment: "#67e8f9",   // cyan-300
  miscellaneous: "#dbd3d1",   // gray-300
}

/**
 * @param {{category: string; amount: number}[]} breakdown
 * @returns {[]}
 */
export function mappedChartData(breakdown) {
  return breakdown.reduce((acc, row) => {
    return [
      ...acc,
      {
        category: row.category,
        amount: row.amount,
        fill: fillColor[row.category],
      },
    ];
  }, []);
}

/**
 * @param {{category: string; amount: number}[]} breakdown
 * @returns {Record<string, {label:string; color: string;}>}
 */
export function getChartConfig(breakdown) {
  return breakdown.reduce(
    (acc, row) => {
      if (row.category === "bills") {
        return {
          ...acc,
          bills: {
            label: row.category,
            color: "var(--chart-1)",
          },
        };
      }

      if (row.category === "miscellaneous") {
        return {
          ...acc,
          miscellaneous: {
            label: "misc",
            color: "var(--chart-2)",
          },
        };
      }

      if (row.category === "utilities") {
        return {
          ...acc,
          utilities: {
            label: "util",
            color: "var(--chart-3)",
          },
        };
      }

      if (row.category === "subscription") {
        return {
          ...acc,
          subscription: {
            label: "subs",
            color: "var(--chart-4)",
          },
        };
      }

      if (row.category === "food") {
        return {
          ...acc,
          food: {
            label: "food",
            color: "var(--chart-5)",
          },
        };
      }

      return acc;
    },
    { amounts: { label: "Amounts" } },
  );
}
