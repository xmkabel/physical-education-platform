import axiosInstance from "../../services/axios";

/**
 * Main GET function to fetch data from API
 * @param {string} path - API endpoint path (e.g., '/exams', '/users/1', etc.)
 * @returns {Promise<any>} - Promise resolving to the API response data
 */
const get = async (path) => {
  try {
    const response = await axiosInstance.get(path);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    throw error;
  }
};

export default get;