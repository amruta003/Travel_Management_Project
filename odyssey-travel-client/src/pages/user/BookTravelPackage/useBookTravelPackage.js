import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const ageOptions = ["18-24 Years", "25-39 Years", "40-60 Years"];
export const genderOptions = ["Male", "Female", "Other"];
export const relationOptions = ["Spouse", "Sibling", "Parent", "Friend", "Self"];

export default function useBookTravelPackage() {
    const navigate = useNavigate();
    const { packageId } = useParams(); // Get package ID from URL 
    const location = useLocation();
    const id = packageId;

    // Use location state to pre-populate package data for better UX
    const initialPackageData = location.state?.package || null;

    //Dynamic Package Data from Backend
    const [packageData, setPackageData] = useState(initialPackageData);
    const [loading, setLoading] = useState(!initialPackageData);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        // Clear old booking data when loading a new package
        const lastPackageId = sessionStorage.getItem("packageId");
        if (lastPackageId !== id) {
            sessionStorage.removeItem("primaryTraveler");
            sessionStorage.removeItem("familyMembers");
            sessionStorage.removeItem("specialRequest");
            sessionStorage.removeItem("travelDate");
        }

        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/packages/${id}`);
                setPackageData(response.data);
            } catch (error) {
                console.error("Could not fetch package:", error);
            }
            setLoading(false);
        };

        fetchPackageDetails();
    }, [id]);

    // Helper to Load Form from Session Storage
    const loadFromSession = (key, defaultValue) => {
        const saved = sessionStorage.getItem(key);
        if (!saved) return defaultValue;

        try {
            return JSON.parse(saved);
        } catch (error) {
            return saved;
        }
    };

    // Form State Initialisation
    const [primaryTraveler, setPrimaryTraveler] = useState(() =>
        loadFromSession("primaryTraveler", { fullName: "", email: "", mobile: "" })
    );

    const [familyMembers, setFamilyMembers] = useState(() =>
        loadFromSession("familyMembers", [])
    );

    const [specialRequest, setSpecialRequest] = useState(() =>
        loadFromSession("specialRequest", "")
    );

    const [travelDate, setTravelDate] = useState("");

    // Logic Handlers
    const updatePrimaryDetail = (field, value) => {
        if (field === "travelDate") {
            setTravelDate(value);
        }
        setPrimaryTraveler((prev) => ({ ...prev, [field]: value }));
    };

    const addMember = () => {
        setFamilyMembers([...familyMembers, { fullName: "", age: "18-24 Years", gender: "Male", relation: "Sibling" }]);
    };

    const removeMember = (index) => {
        setFamilyMembers(familyMembers.filter((_, i) => i !== index));
    };

    const updateMember = (index, field, value) => {
        const newList = [...familyMembers];
        newList[index][field] = value;
        setFamilyMembers(newList);
    };

    // Dynamic Price Calculations
    const pricePerPerson = packageData ? packageData.price : 0;
    const taxesFees = 150;
    const discounts = 50;
    const totalTravelers = familyMembers.length; // Count only added members

    const totalBasePrice = pricePerPerson * totalTravelers;
    const finalAmount = totalTravelers > 0 ? (totalBasePrice + taxesFees - discounts) : 0;

    // Handle Proceed
    const handleProceed = () => {
        console.log("handleProceed called. totalTravelers:", totalTravelers);

        // Validation: primary contact info and at least 1 traveler
        if (!primaryTraveler.fullName) {
            alert("Please provide the primary contact's full name.");
            return;
        }

        if (totalTravelers === 0) {
            alert("Please add at least one member to the travelers list to proceed.");
            return;
        }

        const priceDetailsToStore = {
            totalTravelers,
            pricePerPerson,
            basePrice: totalBasePrice,
            taxesFees,
            discounts,
            finalAmount
        };

        // Save form data to session storage
        sessionStorage.setItem("primaryTraveler", JSON.stringify(primaryTraveler));
        sessionStorage.setItem("familyMembers", JSON.stringify(familyMembers));
        sessionStorage.setItem("specialRequest", specialRequest);
        sessionStorage.setItem("travelDate", travelDate);

        // Save package/price data for Payment page
        sessionStorage.setItem("packageId", id);
        sessionStorage.setItem("packageTitle", packageData ? packageData.title : "Package");
        sessionStorage.setItem("packagePrice", pricePerPerson);
        sessionStorage.setItem("totalAmount", finalAmount);
        sessionStorage.setItem("travelers", totalTravelers);
        sessionStorage.setItem("priceDetails", JSON.stringify(priceDetailsToStore));

        navigate("/user/payment");
    };

    return {
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
        travelDate,
        setTravelDate,
        priceDetails: {
            totalTravelers,
            pricePerPerson,
            basePrice: totalBasePrice,
            taxesFees,
            discounts,
            finalAmount
        },
        handleProceed,
    };
}
