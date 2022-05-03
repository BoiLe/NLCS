import "./style.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../context/darkModeContext.js";
import React, { useContext } from "react";

const Navbar = (props) => {
  const [searchItem, setsearchItem] = React.useState("");
  const { dispatch } = useContext(DarkModeContext);
  const handleChange = (e) => {
    setsearchItem(e.target.value);
    props.searchIte(e.target.value);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." onChange={handleChange}/>
          <SearchOutlinedIcon />
        </div>
      
      </div>
    </div>
  );
};

export default Navbar;
