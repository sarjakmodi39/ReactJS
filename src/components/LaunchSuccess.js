import React from "react";

const LaunchSuccess = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
      };
  return (
    <>
      <label>Filter By success: </label>
      <select  onChange={dropdownChangeHandler}   >
        <option value={true}>Success</option>
        <option value={false}>Failure</option>
      </select>
    </>
  );
};
export default LaunchSuccess;