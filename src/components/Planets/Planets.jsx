import React, { useEffect } from "react";
import { useState, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PlanetResident from "../PlanetResident/PlanetResident";

import "./Planets.css";

const Planets = ({ planets }) => {
  const loadingRef = useRef();
  const [planetResident, setPlanetResident] = useState(null);
  const [displayPlanets, setDisplayPlanets] = useState([]);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);

  const getMorePlanets = () => {
    displayPlanets.length > 0 && setInfiniteScrollLoading(true);
    let delay = displayPlanets.length > 0 ? 500 : 0;
    if (planets[displayPlanets.length + 1]) {
      let ps;
      if (planets[displayPlanets.length + 10]) {
        ps = planets.slice(
          planets[displayPlanets.length],
          displayPlanets.length + 10
        );
      } else {
        ps = planets.slice(planets[displayPlanets.length]);
      }
      setTimeout(() => {
        setDisplayPlanets(ps);
        infiniteScrollLoading && setInfiniteScrollLoading(false);
      }, delay);
    } else {
      return;
    }
  };

  useEffect(() => {
    getMorePlanets();
  }, [planets]);

  const planetsLists = displayPlanets.map((planet) => {
    return (
      <tr key={planet.name}>
        <td>{planet.name}</td>
        <td>{planet.gravity ? planet.gravity : "N/A"}</td>
        <td>
          <button
            onClick={() => setPlanetResident(planet)}
            className="resident-btn"
          >
            <span>{planet.residents.length}</span>
            <i className="fas fa-user-friends"></i>
          </button>
        </td>
      </tr>
    );
  });

  let getMoreData = false;

  const handleObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        !getMoreData && getMorePlanets();
        getMoreData = true;
      }
    });
  };

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
  }, [displayPlanets]);

  return (
    <div className="planets">
      {planetResident && (
        <PlanetResident
          planetResident={planetResident}
          setPlanetResident={setPlanetResident}
        />
      )}
      <table className="content-table">
        <thead>
          <tr>
            <th>Planet</th>
            <th>Gravity</th>
            <th>Residents</th>
          </tr>
        </thead>
        <tbody>{planetsLists}</tbody>
      </table>
      <div
        style={{ height: displayPlanets.length !== planets.length && "3rem" }}
        className="load-more"
        ref={loadingRef}
      >
        {infiniteScrollLoading && displayPlanets.length !== planets.length && (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Planets;
