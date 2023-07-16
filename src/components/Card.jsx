import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
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
    psychic: "#F85888",
    rock: "#B8A038",
    ice: "#98D8D8",
    ghost: "#705898",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    dark: "#705848",
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

  return (
    <div className="card-fondo">
      {loading ? (
        <div className="card-div-loader">
          <Oval
            height={80}
            width={80}
            color="#000000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#ffffff"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <>
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
            {infoPokemon.types.map((type, index) => {
              const nameIndex = `${name} - ${infoPokemon?.id} - ${index}`;
              return (
                <button
                  key={nameIndex}
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
        </>
      )}
    </div>
  );
}
