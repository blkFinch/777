import * as React from "react";

function SearchBar({
  placeholder = "search",
  handleSearch,
  handleTargetUpdate,
  ...props
}) {
  return (
    <div className="field is-justify-content-center">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          onChange={handleTargetUpdate}
        />
      </div>
    </div>
  );
}
export default SearchBar;
