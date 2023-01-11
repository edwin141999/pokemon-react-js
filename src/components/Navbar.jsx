import React from "react";
import Logo from "../images/pokemon-logo.png";
import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="navbar">
            <img src={Logo} alt="" className="navbar-img" />
            <input
                type="text"
                placeholder="Enter Pokemon name or id..."
                className="navbar-search"
            />
            <div className="navbar-div-filter">
                <h4>Filter by Type</h4>
                <select name="type" id="type" className="navbar-filter-type" />
            </div>
            <div className="navbar-div-filter">
                <h4>Filter by Abilities</h4>
                <select
                    name="abilities"
                    id="abilities"
                    className="navbar-filter-abilities"
                />
            </div>
        </div>
    );
}
