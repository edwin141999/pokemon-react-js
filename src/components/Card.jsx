import React, { useEffect, useState } from "react";
import { getInfoPokemonAPI } from "../services/pokemon-api";
import "./Card.css";

export default function Card({ name, url }) {
    const [infoPokemon, setInfoPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const colors = {
        poison: "#a040a0",
        fire: "#E83A0B",
        water: "#6890f0",
        bug: "#a8b820",
        grass: "#6AB630",
        flying: "#A2B2F7",
        normal: "#A8A878",
        electric: "#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
    };

    useEffect(() => {
        const getInfoPokemon = async () => {
            setLoading(true);
            const info = await getInfoPokemonAPI(url);
            setInfoPokemon(info);
            setLoading(false);
        };
        getInfoPokemon();
    }, [url]);

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
                        <button
                            key={name}
                            className="card-type"
                            style={{
                                backgroundColor: colors[type.type.name],
                                border: `1px solid ${colors[type.type.name]}`,
                            }}
                        >
                            {type.type.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
