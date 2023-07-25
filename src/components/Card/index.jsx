import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "../../assets/styles/Card.css";
import { getInfoPokemonAPI } from "../../middleware/pokemon-api";
import { COLORS } from "../../services/constants/colorsConstants";

export default function Card({ name, url }) {
  const [infoPokemon, setInfoPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const IDPokemon = url.split("/")[6];

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
        <Link to={`details/${IDPokemon}`} className="card-link">
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
                    backgroundColor: COLORS[type.type.name],
                    border: `1px solid ${COLORS[type.type.name]}`,
                  }}
                >
                  {type.type.name}
                </button>
              );
            })}
          </div>
        </Link>
      )}
    </div>
  );
}
