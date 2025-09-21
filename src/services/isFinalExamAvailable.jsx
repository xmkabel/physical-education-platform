// utils/api.ts  (or place it in the same file)

import axiosInstance from "./axios";

export const isFinalExamAvailable = async () => {
  try {
    const { data } = await axiosInstance.get('/is');
    // The API returns { available: true/false }
    return data?.available ?? false;
  } catch (err) {
    console.error('Final‑exam check failed', err);
    // Treat an error as “not available” so the user isn’t sent to a broken page
    return false;
  }
};
