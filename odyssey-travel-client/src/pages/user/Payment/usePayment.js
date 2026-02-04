import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function usePayment() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  // Standardize user retrieval from localStorage
  const savedUser = localStorage.getItem("user");
  const userObj = savedUser ? JSON.parse(savedUser) : null;
  const userId = userObj?.id || null;

  const packageId = Number(sessionStorage.getItem("packageId")) || 1;
  const travelDate = sessionStorage.getItem("travelDate") || new Date().toISOString().split('T')[0];
  const travelers = Number(sessionStorage.getItem("travelers")) || 1;
  const totalAmount = Number(sessionStorage.getItem("totalAmount")) || 0;

  // Read traveler objects
  const primaryTraveler = JSON.parse(sessionStorage.getItem("primaryTraveler") || "{}");
  const familyMembers = JSON.parse(sessionStorage.getItem("familyMembers") || "[]");
  const specialRequest = sessionStorage.getItem("specialRequest");

  // Pay Now Handler
  const handlePayNow = async () => {

    // Map family members to Companions for backend
    const companionsList = familyMembers.map((member) => {
      return {
        fullName: member.fullName,
        age: parseInt(member.age) || 20, // Convert string age to number
        gender: member.gender,
        relation: member.relation
      };
    });

    // Create the final booking payload
    const payload = {
      userId: userId, // Dynamic userId from localStorage
      packageId: packageId,
      travelDate: travelDate,
      travelers: travelers,
      totalAmount: totalAmount,
      contactFullName: primaryTraveler.fullName,
      contactEmail: primaryTraveler.email,
      contactNumber: primaryTraveler.mobile,
      specialRequest: specialRequest,
      companions: companionsList,
      payment: {
        amount: totalAmount,
        paymentMethod: paymentMethod.toUpperCase()
      }
    };

    console.log("Sending booking payload:", payload);

    try {
      const response = await api.post("/api/bookings", payload);
      alert(response.data); // Status message from backend

      // Clear session
      sessionStorage.removeItem("primaryTraveler");
      sessionStorage.removeItem("familyMembers");
      sessionStorage.removeItem("specialRequest");
      sessionStorage.removeItem("travelDate");
      sessionStorage.removeItem("packageId");
      sessionStorage.removeItem("packageTitle");
      sessionStorage.removeItem("packagePrice");
      sessionStorage.removeItem("totalAmount");
      sessionStorage.removeItem("travelers");
      sessionStorage.removeItem("priceDetails");

      navigate("/user/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please check your data.");
    }
  };

  return {
    packageId,
    totalAmount,
    handlePayNow,
    paymentMethod,
    setPaymentMethod
  };
}
