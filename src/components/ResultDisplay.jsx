import * as React from "react";

export function ResultDisplay({ results, ...props }) {
  return (
    <div className="box">
      {results.map((elem) => (
        <div className="content">
          <p>
            <strong>{results.columnName}</strong>
          </p>
          <p>{results.value}</p>
        </div>
      ))}
    </div>
  );
}
