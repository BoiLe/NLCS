import "./style.css";
import Sidebar from "../../sidebar";
import Navbar from "../../navbar";
import Datatable from "../../ProductSource";
import { useState } from "react";

const List = () => {
  const [searchItem, setsearchItem] = useState("");
  const search = (data) => {
    setsearchItem(data);
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar searchIte={search}/>
        <Datatable search={searchItem}/>
      </div>
    </div>
  );
};

export default List;
