import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./styles/main-styles.scss";
import SearchBar from "./components/searchBar";
import Data from "./assets/liber777.json";

function App() {
  const [target, setTarget] = useState(() => "init");
  const [data] = useState(() => loadData()); //lazy init should only read data once

  //TODO: parse json to match array of objs like below
  const dummy = {
    colNumber: "III.",
    colName: "English of Col. II.",
    rows: {
      0: ["multiple", "names"],
      1: "Crown",
      2: "Wisdom",
      3: "Understanding",
    },
  };

  function loadData() {
    const res = [];
    for (var i in Data) {
      res.push([i, Data[i]]);
    }
    return res;
  }

  function handleSearch(e) {
    console.log(target);
    console.log(data);
    // const res = data[2].find((elem) => elem.includes(target));
    // console.log(res);
  }

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
