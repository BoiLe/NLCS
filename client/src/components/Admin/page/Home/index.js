
import React, { useState } from "react";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import Table from "../../table";
import "./style.css";

export default function Admin() {
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">Home Admin</div>
          
        </div>
      </div>
    </div>
  );
}
