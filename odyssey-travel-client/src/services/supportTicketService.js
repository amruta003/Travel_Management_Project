import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/support";

//============== RAISE SUPPORT TICKET ================

export const raiseSupportTicket = async ({

    userId,
    bookingId,
    subject,
    description,
    priority,
}) => {
    const params = {
        userId,
        subject,
        description,
        priority,
    };

    if(bookingId) {
        params.bookingId = bookingId;
    }

    const response = await axios.post(API_BASE_URL,null,{
        params,
    });
    return response.data;
}

// =============GET USER TICKETS==============

export const getUserSupportTickets = async(userId) => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
};