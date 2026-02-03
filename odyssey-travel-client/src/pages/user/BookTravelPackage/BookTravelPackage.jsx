import React from "react";
import useBookTravelPackage, { ageOptions, genderOptions, relationOptions } from "./useBookTravelPackage";

export default function BookingPage() {
  // Use our custom logic hook
  const {
    packageData,
    loading,
    primaryTraveler,
    updatePrimaryDetail,
    familyMembers,
    addMember,
    removeMember,
    updateMember,
    specialRequest,
    setSpecialRequest,
    priceDetails,
    handleProceed
  } = useBookTravelPackage();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-700 min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-blue-500 animate-pulse">Loading package info...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-700 min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Booking: {packageData ? packageData.title : "Travel Package"}
        </h1>

        {/* 1. Primary Traveler Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-600 mb-8">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 border-b pb-2">
            Contact Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={primaryTraveler.fullName}

                onChange={(e) => updatePrimaryDetail("fullName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full p-3 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={primaryTraveler.email}

                  onChange={(e) => updatePrimaryDetail("email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full p-3 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={primaryTraveler.mobile}
                  required

                  onChange={(e) => updatePrimaryDetail("mobile", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Date</label>
              <input
                type="date"
                className="w-full p-3 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={primaryTraveler.travelDate}
                onChange={(e) => updatePrimaryDetail("travelDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 2. Additional Family Members */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-600 mb-8">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Travelers
            </h2>
            <button
              onClick={addMember}
              className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded font-bold text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition shadow-sm"
            >
              + Add Member
            </button>
          </div>

          <div className="space-y-6">
            {familyMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600 relative group">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded text-xs font-bold text-gray-700 dark:text-gray-200">
                    MEMBER {index + 1}
                  </span>
                  {familyMembers.length > 1 && (
                    <button
                      onClick={() => removeMember(index)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-900 dark:text-white text-sm"
                      value={member.fullName}
                      onChange={(e) => updateMember(index, "fullName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Age Range</label>
                    <select
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-900 dark:text-white text-sm"
                      value={member.age}
                      onChange={(e) => updateMember(index, "age", e.target.value)}
                    >
                      {ageOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Gender</label>
                    <select
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-900 dark:text-white text-sm"
                      value={member.gender}
                      onChange={(e) => updateMember(index, "gender", e.target.value)}
                    >
                      {genderOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Relation</label>
                    <select
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-900 dark:text-white text-sm"
                      value={member.relation}
                      onChange={(e) => updateMember(index, "relation", e.target.value)}
                    >
                      {relationOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Special Requests */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-600 mb-8">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Special Requests
          </h2>
          <textarea
            className="w-full p-3 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-24"
            placeholder="E.g. Vegetarian meals, accessibility, etc."
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
          />
        </div>

        {/* 4. Package & Price Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-600 mb-10">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 border-b pb-2">
            Payment Summary
          </h2>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span className="font-medium">Base Package Price (per person)</span>
              <span className="font-semibold">₹{priceDetails.pricePerPerson}</span>
            </div>
            <div className="flex justify-between">
              <span>{priceDetails.totalTravelers} Traveler{priceDetails.totalTravelers > 1 ? 's' : ''} (Total Base Price)</span>
              <span>₹{priceDetails.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax & Booking Fees</span>
              <span>+₹{priceDetails.taxesFees}</span>
            </div>
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Special Discounts (5% OFF)</span>
              <span>-₹{priceDetails.discounts}</span>
            </div>

            <hr className="dark:border-gray-700 my-4" />

            <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white">
              <span>Final Total</span>
              <span className="text-blue-600 dark:text-blue-400">₹{priceDetails.finalAmount}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pb-20">
          <button
            onClick={handleProceed}
            className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-xl hover:shadow-blue-500/20 active:scale-95"
          >
            Confirm & Proceed to Payment
          </button>
        </div>

      </div>
    </div>
  );
}