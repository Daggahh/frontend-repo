import axios from "axios";

const API_URL = "https://backend-repo-1-x2b1.onrender.com";

// Add a new contact
export const addContactToAPI = async (contactData) => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.post(`${API_URL}/add`, contactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch all contacts
export const fetchContactsFromAPI = async (jobId = null) => {
  const token = localStorage.getItem("authtoken");
  const url = jobId ? `${API_URL}?jobId=${jobId}` : API_URL; // Optional jobId filter
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a contact
export const updateContactInAPI = async (contactId, updatedContactData) => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.put(
    `${API_URL}/${contactId}`,
    updatedContactData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Delete a contact
export const deleteContactFromAPI = async (contactId) => {
  const token = localStorage.getItem("authtoken");
  await axios.delete(`${API_URL}/${contactId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
