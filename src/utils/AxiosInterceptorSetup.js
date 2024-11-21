// // src/components/AxiosInterceptorSetup.js
// import { useEffect } from 'react';
// import { setupAxiosInterceptor } from '../utils/apiInterceptor'; // Adjust the path to your interceptor file
// import { useRequestLogger } from '../context/RequestLoggerContext'; // Import the logger context

// const AxiosInterceptorSetup = () => {
//   const { logRequest } = useRequestLogger(); // Access the logRequest function from the context

//   useEffect(() => {
//     setupAxiosInterceptor(logRequest); // Set up Axios interceptor with logRequest
//   }, [logRequest]);

//   return null; // This component is for setup only, it doesn’t render anything
// };

// export default AxiosInterceptorSetup;
