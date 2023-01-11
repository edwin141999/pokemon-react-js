import React, { useEffect, useState } from "react";
import "./Card.css";

export default function Card({ name, url }) {
    const [infoPokemon, setInfoPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const colors = {
        poison: "#a040a0",
        fire: "#f08030",
        water: "#6890f0",
        bug: "#a8b820",
    };
    const getInfoPokemon = () => {
        setLoading(true);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInfoPokemon(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        getInfoPokemon();
    }, []);

    return loading ? (
        <h1 className="card-titulo">Loading..</h1>
    ) : (
        <div className="card-fondo">
            <h4 className="card-titulo">
                {name} {infoPokemon.id}
            </h4>
            <div className="card-div-img">
                <img
                    src={infoPokemon.sprites.front_default}
                    alt={name}
                    className="card-img"
                />
            </div>
            <div className="card-div-type">
                {infoPokemon.types.map((type) => {
                    return (
                        <button key={name} className="card-type">
                            {type.type.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
