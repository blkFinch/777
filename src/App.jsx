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

  const dummyData = [
    {
      "XXXIV.": {
        columnName: "Some Greek Gods",
        0: "Pan",
        1: "Zeus, Iacchus",
        2: "Athena, Uranus [[Hermes]]",
        3: "Cybele, Demeter, Rhea, Heré, [[Psyché, Kronos]]",
        4: "Poseidon [[Zeus]]",
        5: "Ares, Hades",
        6: "Iacchus, Apollo, Adonis [[Dionysus, Bacchus]]",
        7: "Aphrodité, Niké",
        8: "Hermes",
        9: "Zeus (as D), Diana of Epheus (as phallic stone [[and =]]) [[Eros]] ",
        10: "Persephone, [Adonis], Psyché",
        11: "Zeus",
        12: "Hermes ",
        13: "Artemis, Hekaté ",
        14: "Aphrodité ",
        15: "Athena",
        16: "[Heré]",
        17: "Castor and Pollux, Apollo the Diviner [[Eros]]",
        18: "Apollo the Charioteer",
        19: "Demeter [borne by lions]",
        20: "[Attis]",
        21: "Zeus",
        22: "Themis, Minos, Aeacus and Rhadamanthus",
        23: "Poseidon",
        24: "Ares [[Apollo the Pythean, Thanatos]]",
        25: "Apollo, Artemis (hunters)",
        26: "Pan, Priapus [Erect Hermes and Bacchus]",
        27: "Ares, [[Athena]]",
        28: "[Athena] Ganymede",
        29: "Poseidon [[Hermes Psychopompos]]",
        30: "Helios, Apollo",
        31: "Hades",
        32: "[Athena]",
        "32 bis": "[Demeter] [[Gaia]]",
        "31 bis": "Iacchus",
      },
    },
  ];

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
    console.log(target); //TODO: make target auto capitalize

    //TODO: optimize this algorithm
    //for each element in data do
    //check if target exists in element
    //if it does, capture the column name then perform the following:

    // check if target exists in blob
    checkIfTargetExists(target, dummyData)
      ? console.log("found")
      : console.log("not found");

    // if it does, split blob into array of strings
    const splitBlob = JSON.stringify(dummyData).split(":");
    console.log(splitBlob);

    // filter into array of indexes where target exists
    const hits = splitBlob
      .map((elem, index) => {
        return elem.indexOf(target) > -1 ? index : null;
      })
      .filter((n) => n);

    // map indexes to two arrays: column keys, and string values
    const colKeys = hits.map((i) => {
      var targ = splitBlob[i - 1];
      return targ.split(",").slice(-1)[0]; //last element is key as it appears before the ':'
    });

    const colVals = hits.map((i) => {
      //pops the tailing key from the string
      var targ = splitBlob[i].split(",");
      targ.pop();
      return targ.join(",");
    });

    colKeys.forEach((elem, index) => {
      console.log(elem, colVals[index]);
    });
  }

  //END Search Functions

  function onTargetUpdate(e) {
    setTarget(e.target.value);
  }
  //TODO: return a list of results while typing
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
