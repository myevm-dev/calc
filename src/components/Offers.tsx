import React from "react";
import { OfferResults } from "../types/OfferResults";
import { CashOnCashResult } from "../types/CashOnCashResult";

interface Props {
  results: OfferResults;
  cashOnCashResults: CashOnCashResult[];
}

export default function Offers({ results, cashOnCashResults }: Props) {
  const labels = {
    cash: "Cash Offer via DSCR",
    sellerFinance: "Seller Finance",
    takeover: "Mortgage Takeover",
    hybrid: "Hybrid"
  };

  const typeMap: Record<string, string> = {
    cash: "Cash via DSCR",
    sellerFinance: "Seller Finance",
    takeover: "Mortgage Takeover",
    hybrid: "Hybrid"
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto">
      {Object.entries(results).map(([key, value]) => {
        const isComingSoon = value.toLowerCase().includes("coming soon");
        const coc = cashOnCashResults.find((r) => r.type === typeMap[key]);

        const borderColor = isComingSoon
          ? "border-grey-500"
          : coc?.pass
            ? "border-green-500"
            : "border-red-500";

        return (
          <div
            key={key}
            className={`border-2 ${borderColor} p-6 rounded-2xl shadow hover:shadow-lg transition text-center flex flex-col justify-between`}
          >
            <div>
              <div className="text-lg font-semibold mb-2">
                {labels[key as keyof OfferResults]}
              </div>
              <pre className="text-sm whitespace-pre-wrap mb-2">{value}</pre>

              {!isComingSoon && coc && (
                <div className="text-xs bg-zinc-800 rounded p-3 text-left space-y-1">
                  <h4 className="text-lg font-bold mb-1">Cash-on-Cash</h4>
                  <p><strong>Entry:</strong> ${Number(coc.entry).toFixed(2)}</p>
                  <p><strong>Monthly Payment:</strong> ${Number(coc.monthlyPayment).toFixed(2)}</p>
                  <p><strong>Monthly Cash Flow:</strong> ${Number(coc.monthlyCashFlow).toFixed(2)}</p>
                  <p><strong>Annual Cash Flow:</strong> ${Number(coc.annualCashFlow).toFixed(2)}</p>
                  <p>
                    <strong>Return:</strong>
                    <span className={coc.pass ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                      {Number(coc.cashOnCash).toFixed(2)}%
                    </span>
                  </p>
                  <p className={coc.pass ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {coc.pass ? "Deal ✅" : "No Deal ❌"}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Details
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
