import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./styles/main-styles.scss";
import SearchBar from "./components/searchBar";
import Data from "./assets/liber777.json";

function App() {
  const [target, setTarget] = useState(() => "init");
  const [data] = useState(() => loadData()); //lazy init should only read data once

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

  //TODO: fix this function
  function customFilter(object, col, result) {
    console.log(object);
    console.log(result);
    if (object.hasOwnProperty("columnName")) result.push(object[col]);

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        customFilter(object[Object.keys(object)[i]], result);
      }
    }
  }

  function handleSearch(e) {
    console.log(target);
    const col = filterByValue(data, toTitleCase(target));
    const res = [];
    console.log(col);
    customFilter(data, col, res);
    console.log(res);
    // if (checkIfTargetExists(target, data)) {
    //   console.log("found-- performing lookup");
    // } else {
    //   console.log("target not found");
    // }
    // const res = data[2].find((elem) => elem.includes(target));
    // console.log(res);
  }

  //END Search Functions

  function onTargetUpdate(e) {
    setTarget(e.target.value);
  }

  return (
    <div className="App">
      <SearchBar
        placeholder="Enter target symbol"
        handleSearch={handleSearch}
        handleTargetUpdate={onTargetUpdate}
      />
    </div>
  );
}

export default App;
