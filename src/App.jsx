import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./styles/main-styles.scss";
import SearchBar from "./components/searchBar";
import Data from "./assets/liber777.json";

function App() {
  const [target, setTarget] = useState(() => "init");
  const [data] = useState(() => loadData()); //lazy init should only read data once
  const [results, setResults] = useState(() => []);

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

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  function filterByValue(object, target) {
    const res = getKeyByValue(object, target);
    if (res) return res;

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        var o = filterByValue(object[Object.keys(object)[i]], target);
        if (o != null) {
          return o;
        }
      }
    }

    return null;
  }

  function handleSearch(e) {
    var res = [];
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

  // COMPONENTS
  //
  //TODO: make this a component, style it
  function ResDisplay({ result }) {
    return (
      <div>
        <p className="menu-label">{result.column}</p>
        <ul className="menu-list">
          {result.rows.map((row) => (
            <li key={row.row}>
              <a>{row.value}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function onTargetUpdate(e) {
    setTarget(toTitleCase(e.target.value));
  }
  //TODO: return a list of results while typing
  return (
    <div className="App">
      <div className="columns">
        <aside className="menu" style={{ textAlign: "left" }}>
          {results.map((elem) => (
            <ResDisplay result={elem} key={elem.column} />
          ))}
        </aside>
        <SearchBar
          placeholder="Enter target symbol"
          handleSearch={handleSearch}
          handleTargetUpdate={onTargetUpdate}
        />
      </div>
    </div>
  );
}

export default App;
