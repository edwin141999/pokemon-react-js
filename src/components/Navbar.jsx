import React, { useEffect, useState } from "react";
import Logo from "../images/pokemon-logo.png";
import {
    getAbilitiesPokemonAPI,
    getTypePokemonAPI,
} from "../services/pokemon-api";
import "./Navbar.css";

export default function Navbar() {
    const [types, setTypes] = useState([]);
    const [abilities, setAbilities] = useState([]);
    useEffect(() => {
        const getTypes = async () => {
            const types = await getTypePokemonAPI();
            setTypes(types);
        };
        getTypes();
    }, []);

    useEffect(() => {
        const getAbilities = async () => {
            const abilities = await getAbilitiesPokemonAPI();
            setAbilities(abilities);
        };
        getAbilities();
    }, []);

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
                <select name="type" id="type" className="navbar-filter-type">
                    {types.map((type) => (
                        <option key={type.name} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="navbar-div-filter">
                <h4>Filter by Abilities</h4>
                <select
                    name="abilities"
                    id="abilities"
                    className="navbar-filter-abilities"
                >
                    {abilities.map((ability) => (
                        <option key={ability.name} value={ability.name}>
                            {ability.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
