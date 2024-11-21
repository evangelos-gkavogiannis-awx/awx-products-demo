// import React, { createContext, useContext, useState } from 'react';

// const RequestLoggerContext = createContext();

// export const RequestLoggerProvider = ({ children }) => {
//   const [requests, setRequests] = useState([]);

//   const logRequest = (request) => {
//     setRequests((prev) => [...prev, request]);
//   };

//   return (
//     <RequestLoggerContext.Provider value={{ requests, logRequest }}>
//       {children}
//     </RequestLoggerContext.Provider>
//   );
// };

// export const useRequestLogger = () => {
//   const context = useContext(RequestLoggerContext);
//   if (!context) {
//     throw new Error('useRequestLogger must be used within a RequestLoggerProvider');
//   }
//   return context;
// };
