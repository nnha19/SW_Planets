import React, { useEffect, useState } from "react";
import Planets from "../components/Planets/Planets";
import { useQuery, gql } from "@apollo/client";

const PLANETS = gql`
  query GetPlanets {
    sWAPI_Planets {
      count
      edges {
        node {
          name
          population
          gravity
          residents {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const { data, loading, error } = useQuery(PLANETS);

  useEffect(() => {
    const result =
      data &&
      data.sWAPI_Planets.edges.map((p) => {
        const { name, gravity } = p.node;
        const residents = p.node.residents.edges.map((r) => r.node.name);
        return {
          name,
          gravity,
          residents,
        };
      });
    setPlanets(result);
  }, [data]);
  return (
    <>{planets && !!planets.length ? <Planets planets={planets} /> : null}</>
  );
};

export default PlanetsPage;
