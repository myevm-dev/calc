import { useState } from "react";


export default function CashOnCashCalculator() {
  const [rent, setRent] = useState("");
  const [taxes, setTaxes] = useState("");
  const [insurance, setInsurance] = useState("");
  const [hoa, setHoa] = useState("");
  const [principal, setPrincipal] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");

  const rentNum = parseFloat(rent) || 0;
  const taxesNum = parseFloat(taxes) || 0;
  const insuranceNum = parseFloat(insurance) || 0;
  const hoaNum = parseFloat(hoa) || 0;
  const principalNum = parseFloat(principal) || 0;
  const entry = parseFloat(downPayment) || 0;

  const mmr = rentNum * 0.8;
  const monthlyCashFlow = mmr - taxesNum - insuranceNum - hoaNum - principalNum;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCash = entry > 0 ? (annualCashFlow / entry) * 100 : 0;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">


      <div className="max-w-md mx-auto p-4 mt-8 mb-20 border rounded-2xl shadow-md bg-black space-y-4 text-sm">
        {/* Example Buttons */}
        <div className="flex justify-center gap-4 mb-2 flex-wrap">
          <button
            onClick={() => {
              setRent("1500");
              setTaxes("150");
              setInsurance("75");
              setHoa("0");
              setPrincipal("500");
              setPurchasePrice("150000");
              setDownPayment("15000");
            }}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded text-white text-sm"
          >
            Load Good Deal Example
          </button>

          <button
            onClick={() => {
              setRent("1100");
              setTaxes("200");
              setInsurance("100");
              setHoa("50");
              setPrincipal("450");
              setPurchasePrice("150000");
              setDownPayment("20000");
            }}
            className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded text-white text-sm"
          >
            Load Bad Deal Example
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label>Monthly Rent Incoming:</label>
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800"
              placeholder="0"
            />
          </div>

          <div>
            <label>Monthly Taxes:</label>
            <input
              type="number"
              value={taxes}
              onChange={(e) => setTaxes(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800"
              placeholder="0"
            />
          </div>

          <div>
            <label>Monthly Insurance:</label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800"
              placeholder="0"
            />
          </div>

          <div>
            <label>Monthly HOA:</label>
            <input
              type="number"
              value={hoa}
              onChange={(e) => setHoa(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800"
              placeholder="0"
            />
          </div>

          <div>
            <label>Monthly Payment to Seller:</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800"
              placeholder="0"
            />
          </div>

          <div>
            <label>Purchase Price (Listing Price +10%):</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800"
              placeholder="0"
            />
          </div>

          <div>
            <label>Down Payment Amount (Goal: 10% of Purchase Price):</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full p-2 border rounded text-white bg-gray-800 placeholder-gray-400"
              placeholder="e.g. 15000"
            />
          </div>
        </div>

        {/* Output Display */}
        <div className="pt-4 space-y-1 text-base">
          <p><strong>Monthly Cash Flow:</strong> ${monthlyCashFlow.toFixed(2)}</p>
          <p><strong>Annual Cash Flow:</strong> ${annualCashFlow.toFixed(2)}</p>
          <p><strong>Entry (Down Payment):</strong> ${entry.toFixed(2)}</p>

          <p className="text-lg font-bold">
            Cash-on-Cash Return:
            <span className={cashOnCash >= 20 ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
              {cashOnCash.toFixed(2)}%
            </span>
          </p>

          <p className={cashOnCash >= 20 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
            {cashOnCash >= 20 ? "It's a Deal!" : "No Deal: Under Target 20% CoC"}
          </p>
        </div>
      </div>
    </div>
  );
}
