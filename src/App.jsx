import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./styles/main-styles.scss";
import SearchBar from "./components/searchBar";
import ResultDisplay from "./components/ResultDisplay";
import Data from "./assets/liber777.json";

function App() {
  const [target, setTarget] = useState("init");
  const [data] = useState(() => loadData()); //lazy init should only read data once
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState([]);
  const [targetName, setTargetName] = useState("");

  // converts data to an array of arrays
  // element 0 is the Roman numeral
  // element 1 is the Column data
  function loadData() {
    const res = [];
    for (var i in Data) {
      res.push([i, Data[i]]);
    }
    return res;
  }

  //Handlers
  //
  function handleSearch(e) {
    let res = [];
    data.forEach((elem) => {
      if (checkIfTargetExists(target, elem[1])) {
        console.log("found in " + elem[1].columnName);
        let ret = {
          column: elem[1].columnName,
          rows: findInData(target, elem[1]),
        };
        res.push(ret);
      }
    });
    setResults(res);
  }

  function handleRowClick(row) {
    let res = [];
    data.forEach((elem) => {
      if (elem[1][row.row]) {
        let ret = {
          column: elem[1].columnName,
          value: elem[1][row.row],
        };
        res.push(ret);
      }
    });
    setRows(res);
    setTargetName(row.row + " "  + row.value);
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
  }

  function onTargetUpdate(e) {
    if(rows != []){ clearRows() }
    setTarget(toTitleCase(e.target.value));
    handleSearch(e);
  }

  //Search Functions
  //
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  //TODO: needs to remove special characters
  function checkIfTargetExists(target, data) {
    return JSON.stringify(data).indexOf(toTitleCase(target)) > -1;
  }

  function findInData(target, data) {
    // split blob into array of strings
    const splitBlob = JSON.stringify(data).split(":");

    // filter into array of indexes where target exists
    const hits = splitBlob
      .map((elem, index) => {
        return elem.indexOf(target) > -1 ? index : null;
      })
      .filter((n) => n);

    // map indexes to two arrays: column keys, and string values
    const colKeys = hits.map((i) => {
      var targ = splitBlob[i - 1];
      //last element is key as it appears before the ':', filter for number
      var num = targ.split(",").slice(-1)[0].match(/\d+/g);
      return num ? num[0] : "title";
    });

    const colVals = hits.map((i) => {
      //pops the tailing key from the string
      var targ = splitBlob[i].split(",");
      targ.pop();
      return targ.join(",");
    });

    let ret = [];

    colKeys.forEach((elem, index) => {
      ret.push({ row: elem, value: colVals[index] });
    });

    return ret;
  }
  //END Search Functions

  function clearRows(){
    setRows([])
  }

  // COMPONENTS
  //
  function RowsDisplay() {
    //TODO: show the selected symbol at the top of the table
    return (
      <>
      <h2 className="subtitle is-2 has-text-light">{targetName}</h2>
      <table
        className="table is-bordered
                        is-narrow 
                        is-hoverable 
                        has-text-light
                        has-background-dark"
      >
        <tbody>
          {rows.map((elem, index) => (
            <tr key={elem.column + index}>
              <th className="has-text-light">{elem.column}</th>
              <td>{elem.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
  }

  function SearchResultDisplay() {
    if (results.length > 0) {
      return (
        <div className="column">
          <aside className="menu has-text-light" style={{ textAlign: "left" }}>
            {results.map((elem) => (
              <ResultDisplay
                result={elem}
                key={elem.column}
                onRowClick={handleRowClick}
              />
            ))}
          </aside>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <RowsDisplay />
      <div className="columns is-centered has-text-grey">
        <SearchResultDisplay />
        <div className="column is-6">
          <div className="content">
            <h2 className="title is-2 has-text-light">777</h2>
            <p>
              This is a quick resource to find correspondances between symbols
              using the tables of Aliester Crowley's Liber 777. Simply start
              typing the name of any diety, tarot card , color, or any other
              symbol from the book and the results will appear to the left.
              Click on a row to display all the correspondances for that row.
            </p>
          </div>
          <SearchBar
            placeholder="Begin typing to search"
            handleSearch={handleSearch}
            handleTargetUpdate={onTargetUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
