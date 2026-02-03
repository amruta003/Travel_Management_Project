import { useState, useEffect } from "react";
import axios from "axios";

export default function useBrowsePackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    // This function gets the real data from backend
    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/packages");
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
