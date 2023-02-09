import * as React from "react";

function SearchBar({
  placeholder = "search",
  handleSearch,
  handleTargetUpdate,
  ...props
}) {
  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          onChange={handleTargetUpdate}
        />
      </div>
      <div className="control">
        <a className="button is-primary" onClick={handleSearch}>
          Search
        </a>
      </div>
    </div>
  );
}
export default SearchBar;
