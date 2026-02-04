import api from "../api/axios";

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

    if (bookingId) {
        params.bookingId = bookingId;
    }

    const response = await api.post('/api/support', null, {
        params,
    });
    return response.data;
}

// =============GET USER TICKETS==============

export const getUserSupportTickets = async (userId) => {
    const response = await api.get(`/api/support/user/${userId}`);
    return response.data;
};