import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/Details.css";
import Button from "../../components/Button";
import {
  getOnePokemonAPI,
  getSpeciesPokemonAPI,
} from "../../middleware/pokemon-api";
import { COLORS } from "../../services/constants/colorsConstants";

export default function Details() {
  const { pokemonId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState([]);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const getInfoPokemon = async () => {
      setLoading(true);
      const infoPokemon = await getOnePokemonAPI(pokemonId);
      const species = await getSpeciesPokemonAPI(pokemonId);
      setInfo(infoPokemon);
      setSpecies(species);
      setLoading(false);
    };
    getInfoPokemon();
  }, [pokemonId]);

  return (
    <main className="main-background">
      {loading ? (
        <div className="oval-loading">
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
        <div
          className="details-fondo"
          style={
            info.types.length === 1
              ? {
                  background: `linear-gradient(160deg, rgba(2, 0, 36, 1) 0%, ${
                    COLORS[info.types[0].type.name]
                  } 50%, ${COLORS[info.types[0].type.name]} 100%)`,
                }
              : {
                  background: `linear-gradient(160deg, rgba(2, 0, 36, 1) 0%, ${
                    COLORS[info.types[0].type.name]
                  } 50%, ${COLORS[info.types[1].type.name]} 100%)`,
                }
          }
        >
          {/* CARD DETAILS */}
          <div className="card-details">
            <p className="details-title-name">
              {info.name}
              <span className="details-title-id"> #{pokemonId}</span>
            </p>
            <div className="details-type">
              {info.types.map((type, index) => {
                return (
                  <button
                    key={`${info.name} - ${type.type.name}`}
                    className="details-card-type"
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
            <div className="details-div-img">
              <img
                src={info.sprites.other["official-artwork"].front_default}
                alt={info.name}
                className="details-img"
              />
            </div>
            <div className="height-weight">
              <h4 className="hw-title">Height</h4>
              <h4 className="hw-title">Weight</h4>
              <p className="hw-subtitle">{info.height}.00 m</p>
              <p className="hw-subtitle">{info.weight}.00 kg</p>
            </div>
            <div className="stats">
              {info.stats.map((stat, index) => {
                return (
                  <div key={`${info.name} - ${stat.stat.name}`}>
                    <div className="stats-details">
                      <h4 className="details-stats-name">{stat.stat.name}</h4>
                      <p className="details-base-stats">: {stat.base_stat}</p>
                    </div>
                    <div className="animated-progress progress-blue">
                      <span style={{ width: `${stat.base_stat}px` }}></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* INFO DETAILS */}
          <div className="info-details">
            <div className="details">
              <h3>Description</h3>
              <p>{species.flavor_text_entries[0].flavor_text}</p>
            </div>
            <div className="details">
              <h3>Abilities</h3>
              {info.abilities.map((ability, index) => {
                return (
                  <div key={`${info.name} - ${ability.ability.name}`}>
                    <h4>{ability.ability.name}</h4>
                  </div>
                );
              })}
            </div>
            <div className="details">
              <h3>Color</h3>
              <p>{species.color.name}</p>
            </div>
            <div className="details">
              <h3>Egg group</h3>
              {species.egg_groups.map((egg, index) => {
                return (
                  <div key={`${info.name} - ${egg.name}`}>
                    <h4>{egg.name}</h4>
                  </div>
                );
              })}
            </div>
            <div className="details">
              <h3>Catch Rate</h3>
              <p>{species.capture_rate}%</p>
            </div>
            <Button
              onClick={() => handleBack()}
              text={"Regresar"}
              className={"details-btn-back"}
            />
          </div>
        </div>
      )}
    </main>
  );
}
