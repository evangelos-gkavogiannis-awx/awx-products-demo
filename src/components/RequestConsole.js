import React, { useEffect, useState } from "react";
import "./RequestConsole.css";
import { requestLogs } from "../utils/apiInterceptor";

const RequestConsole = () => {
  const [logs, setLogs] = useState([]);

  // Periodically fetch logs from the global array
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs([...requestLogs]); // Always show the most recent log
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="request-console">
      <h3>API Request Console</h3>
      <div className="logs">
        {logs.map((log, index) => (
          <div key={index} className="log-item">
            <p>
              <strong>{log.type.toUpperCase()}:</strong> {log.method || ""} {log.url || ""}
            </p>
            {log.status && <p><strong>Status:</strong> {log.status}</p>}
            {log.data && <pre>{JSON.stringify(log.data, null, 2)}</pre>}
            {log.curl && (
              <details>
                <summary>cURL</summary>
                <pre>{log.curl}</pre>
              </details>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestConsole;
