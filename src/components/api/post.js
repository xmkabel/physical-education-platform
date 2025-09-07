import axiosInstance from "../../services/axios";

/**
 * POST helper — supports JSON body, query params, headers, and abort signals.
 * Always returns response.data.
 *
 * @param {string} path - API endpoint (e.g., '/users', '/exams')
 * @param {object | FormData | undefined} [data] - Request body (use undefined for no body)
 * @param {import('axios').AxiosRequestConfig} [config] - Axios config (e.g., params, headers, signal)
 * @returns {Promise<any>}
 */
const post = async (path, data, config = {}) => {
  try {
    const { data: res } = await axiosInstance.post(path, data, config);
    return res;
  } catch (error) {
    const status = error?.response?.status;
    const statusText = error?.response?.statusText;
    const responseData = error?.response?.data;
    const url = error?.config?.url || path;
    const method = (error?.config?.method || "post").toUpperCase();



    // Optional: keep this for quick debugging, or remove if you prefer centralized logging
    console.error(`${method} ${url} failed${status ? ` (${status}${statusText ? ` ${statusText}` : ""})` : ""}: ${error.message}`, {
      status,
      responseData,
    });

    const enriched = new Error(`${method} ${url} failed${status ? ` (${status})` : ""}`);
    enriched.cause = error;
    enriched.status = status;
    enriched.data = responseData;
    enriched.code = error?.code;
    throw enriched;
  }
};

export default post;