import axios from "axios";

// Create a global array to store logs
export const requestLogs = []; // Single-element array for the last API call

// Setup Axios Interceptor
export const setupAxiosInterceptor = () => {
  // Add request interceptor
  axios.interceptors.request.use(
    (config) => {
      // Create cURL request representation
      const curl = `curl --location '${config.baseURL || ""}${config.url}' \\
--header 'Authorization: ${config.headers.Authorization || ""}' \\
--header 'Content-Type: ${config.headers["Content-Type"] || ""}' \\
${config.data ? `--data '${JSON.stringify(config.data, null, 2)}'` : ""}`;

      // Clear previous logs and push the new request
      requestLogs.length = 0; // Clear logs
      requestLogs.push({
        type: "request",
        url: config.baseURL + config.url,
        method: config.method.toUpperCase(),
        headers: config.headers,
        data: config.data,
        curl,
        timestamp: new Date(),
      });

      return config;
    },
    (error) => {
      requestLogs.length = 0; // Clear logs on error
      requestLogs.push({
        type: "request-error",
        error: error.message,
        timestamp: new Date(),
      });
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axios.interceptors.response.use(
    (response) => {
      requestLogs.length = 0; // Clear logs
      requestLogs.push({
        type: "response",
        url: response.config.url,
        method: response.config.method.toUpperCase(),
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        timestamp: new Date(),
      });
      return response;
    },
    (error) => {
      requestLogs.length = 0; // Clear logs on response error
      requestLogs.push({
        type: "response-error",
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        error: error.response?.data || error.message,
        status: error.response?.status,
        timestamp: new Date(),
      });
      return Promise.reject(error);
    }
  );
};
