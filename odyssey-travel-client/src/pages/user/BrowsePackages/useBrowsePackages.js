import { useState, useEffect } from "react";
import api from "../../../api/axios";

export default function useBrowsePackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    // This function gets the real data from backend
    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/packages");
            setPackages(response.data);
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
        setLoading(false);
    };

    // Run the fetch when the page is opened
    useEffect(() => {
        fetchPackages();
    }, []);

    return {
        packages,
        loading
    };
}
