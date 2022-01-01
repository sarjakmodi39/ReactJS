import React from "react";

const LaunchDate = (props) => {
  //var sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>

      <label>Filtered By Launch Date : </label>
      <select   onChange={dropdownChangeHandler}>
        <option value={"week"}>Last Week</option>
        <option value={"month"}>Last Month</option>
        <option value={"year"}>Last Year</option>
      </select>
    </div>
  );
};

export default LaunchDate;
