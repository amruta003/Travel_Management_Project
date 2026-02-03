import React, { useState } from "react";
import usePayment from "./usePayment";
import { useNavigate } from "react-router-dom";
function Payment() {
  // Use the custom hook that connects to backend
  const { packageId, totalAmount, handlePayNow, paymentMethod, setPaymentMethod } = usePayment();
  const navigate = useNavigate();
  //use this to set the default values when data is not available
  const [summary, setSummary] = useState({
    packageName: "Loading...",
    bookingId: "...",
    travelDates: "Date TBD",
    travelers: "...",
    baseFare: 0,
    serviceFee: 0,
    taxes: 0,
    discount: 0,
    total: 0,
  });

  React.useEffect(() => {
    // Load data passed from Booking Page
    const title = sessionStorage.getItem("packageTitle") || "Travel Package";
    const priceDetailsStr = sessionStorage.getItem("priceDetails");
    const familyMembersStr = sessionStorage.getItem("familyMembers");
    const dateStr = sessionStorage.getItem("travelDate") || new Date().toISOString().split('T')[0];

    if (priceDetailsStr) {
      const prices = JSON.parse(priceDetailsStr);
      // Travelers count including primary traveler is in prices.totalTravelers
      const travelerCount = prices.totalTravelers;

      setSummary({
        packageName: title,
        travelDates: `${dateStr} (Flexible)`,
        travelers: `${travelerCount} Traveler${travelerCount !== 1 ? 's' : ''}`,
        baseFare: prices.basePrice,
        serviceFee: prices.taxesFees || 150,
        taxes: 50,
        discount: prices.discounts,
        total: totalAmount
      });
    }
  }, []);

  const toBookTravelPage = () => {
    navigate(`/user/book-package/${packageId}`);
  };
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const formatAmount = (amount) =>
    `₹${(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the backend integration function from usePayment hook
    handlePayNow();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-100">
      <div className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center md:text-left">
          Complete Your Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/*Payment Summary */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-10 transition-all duration-150 hover:shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                  ₹
                </span>
                Payment Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Package Name</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{summary.packageName}</span>
                </div>

                {/* Travel Dates */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <span className="block text-gray-600 dark:text-gray-400 font-medium">Travel Dates</span>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{summary.travelDates}</p>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline transition-all duration-150"
                    onClick={() => toBookTravelPage()}
                  >
                    Edit Dates
                  </button>
                </div>

                {/* Travelers */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <span className="block text-gray-600 dark:text-gray-400 font-medium">Travelers</span>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{summary.travelers}</p>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline transition-all duration-150"
                    onClick={() => toBookTravelPage()}
                  >
                    Edit Guests
                  </button>
                </div>

                {/* Price breakdown */}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Base Fare</span>
                    <span>{formatAmount(summary.baseFare)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Service Fee</span>
                    <span>{formatAmount(summary.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Taxes</span>
                    <span>{formatAmount(summary.taxes)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                    <span>Discount (5% OFF)</span>
                    <span>-{formatAmount(summary.discount)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 text-xl md:text-2xl font-bold">
                  <span className="text-gray-900 dark:text-white">Total Payable Amount</span>
                  <span className="text-green-600 dark:text-green-400">
                    {formatAmount(summary.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-all duration-150 hover:shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Confirm and Pay
              </h2>

              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Payment Method Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  {["card", "netbanking", "upi"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-150 border ${paymentMethod === method
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-transparent shadow-md"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-500 hover:shadow-sm"
                        }`}
                    >
                      {method === "card"
                        ? "Credit/Debit Card"
                        : method === "netbanking"
                          ? "Net Banking"
                          : "UPI"}
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                {paymentMethod === "card" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/30 dark:focus:border-green-400 dark:focus:ring-green-400/30 outline-none transition-all duration-150"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/30 dark:focus:border-green-400 dark:focus:ring-green-400/30 outline-none transition-all duration-150"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/30 dark:focus:border-green-400 dark:focus:ring-green-400/30 outline-none transition-all duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500/30 dark:focus:border-green-400 dark:focus:ring-green-400/30 outline-none transition-all duration-150"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="saveCard"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:focus:ring-green-400"
                      />
                      <label
                        htmlFor="saveCard"
                        className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none"
                      >
                        Save card for future bookings
                      </label>
                    </div>
                  </div>
                )}

                {/* Placeholder for other methods */}
                {paymentMethod !== "card" && (
                  <div className="py-12 text-center text-gray-500 dark:text-gray-400 text-lg font-medium">
                    {paymentMethod === "netbanking" && "Net Banking options coming soon..."}
                    {paymentMethod === "upi" && "Enter your UPI ID to continue..."}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                  <button
                    type="submit"
                    className="px-10 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
                  >
                    Confirm and Pay {formatAmount(summary.total)}
                  </button>

                  <button
                    type="button"
                    className="px-10 py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-150"
                  >
                    Cancel / Go Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;