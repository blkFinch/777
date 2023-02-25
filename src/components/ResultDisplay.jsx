import * as React from "react";

//TODO: style it
function ResultDisplay({ result, onRowClick }) {
  return (
    <div>
      <p className="menu-label has-text-light">{result.column}</p>
      <ul className="menu-list">
        {result.rows.map((row) => (
          <li key={row.row}>
            <a className="has-text-grey" onClick={() => onRowClick(row)}>
              {row.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultDisplay;
