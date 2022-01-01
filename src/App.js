import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Result } from "antd";
import "antd/dist/antd.css";
//import { FaYoutube } from "react-icons/fa";
import { Input, AutoComplete } from "antd";
import LaunchSuccess from "./components/LaunchSuccess";
import LaunchDate from "./components/LaunchDate";
import moment from "moment";
//import SearchBox from "./components/SearchBox/SearchBox";
const App = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredData, setFilteredData] = useState(launches);
  const [result,setResult]=useState();
  const [formData,setFormData]=useState();

  useEffect(() => {
    fetchDataHandler();
  }, []);

  async function fetchDataHandler() {
    const response = await fetch("https://api.spacexdata.com/v3/launches");
    const launchData = await response.json();
    setLaunches(launchData);
    setFilteredData(launchData);
    setResult(launchData);
    //console.log(launchData);
  }

  

  const handleSearch = (value) => {
    let searches=[];
    searches = launches.filter((launchData) => {
      console.log(launchData.rocket.rocket_name.search(value));


      return launchData.rocket.rocket_name.search(value) != -1;
    });
    
    setFilteredData(searches);
  };

  
  const filterChangeHandler = (selectedSuccess) => {
    let status=[];
    console.log(selectedSuccess);
    status = launches.filter(
        (launchData) => launchData.launch_success === (selectedSuccess)
    );
    // result = launches.filter((launchData) => {
    //   if (launchData.launch_success === JSON.parse(selectedSuccess)) {
    //     return result.push(launchData);
    //   }
    // });
    //setStatus(selectedSuccess);
    setResult(status);
    setFilteredData(status);  
  };  

  let ldate=[];
  let today = moment("2020-08-20");

  const dateHandler = (dropdown) => {
    ldate = result.filter((launchData) => {
      let DaysAgo = moment(today).subtract(1, dropdown);
      let date = moment(launchData.launch_date_local);
      if (moment(date).isBetween(DaysAgo, today)) {
        return ldate.push(launchData);
      }
    });

    //setFilteredDate(dropdown);
    setResult(ldate);

    setFilteredData(ldate);
  };

  // const filterChangeHandler = (selectedSuccess) => {
  //   //console.log(selectedSuccess);
  //   for (let i = 0; i < launches.length; i++) {
  //     //  console.log(launches[i].launch_success);
  //     if (launches[i].launch_success === JSON.parse(selectedSuccess)) {
  //       //console.log(launches[i]);
  //       result.push(launches[i]);
  //     }

  //   }

  return (
    <div>
      <header>
        <h2>Launch List</h2>
        <AutoComplete onSearch={handleSearch}>
          <Input.Search
            size="large"
            placeholder="Search By Rocket Name"
            enterButton
          />
        </AutoComplete>
        <LaunchSuccess
          //selected={status}
          onChangeFilter={filterChangeHandler}
        ></LaunchSuccess>
        <LaunchDate
          //selected={filteredDate}
          onChangeFilter={dateHandler}
        ></LaunchDate>
      </header>

      {filteredData.map((value) => {
        return (
          <Card.Grid>
            <div key={value.flight_number}>
              Mission_Name = {value.mission_name} | Mission_Id ={" "}
              {value.mission_id} | Launch_Year = {value.launch_year} |
              Rocket_Name = {value.rocket.rocket_name} |
              <a href={value.links.video_link}>{value.links.video_link}</a> |
              wikipedia_Link =
              <a href={value.links.wikipedia}>{value.links.wikipedia}</a> |
              article_link =
              <a href={value.links.article_link}>{value.links.article_link}</a>|
              Launch_Date={value.launch_date_local}
            </div>
          </Card.Grid>
        );
      })}
    </div>
  );
};

export default App;
