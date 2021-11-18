import React from "react";

import "./PlanetResident.css";

const PlanetResident = ({ planetResident, setPlanetResident }) => {
  const residentsLists = planetResident.residents.map((resident, i) => {
    const avatarName = resident
      .split(" ")
      .map((n) => n[0])
      .join("");
    return (
      <div key={i} className="resident">
        <span className="resident__avatar">{avatarName}</span>
        <h4 className="resident__name">{resident}</h4>
      </div>
    );
  });

  return (
    <>
      <div onClick={() => setPlanetResident(null)} className="backdrop"></div>
      <div className="residents">
        <div className="residents__header">
          <h2> residents of {planetResident.name} </h2>
          <i
            onClick={() => setPlanetResident(false)}
            className="fas fa-times"
          ></i>
        </div>
        {planetResident.residents.length > 0 ? (
          <div>{residentsLists}</div>
        ) : (
          <p className="error">No residents on this planet</p>
        )}
      </div>
    </>
  );
};

export default PlanetResident;
