import React, { useEffect, useState } from "react";
import Preview from "../components/Preview";
import VideoList from "../components/VideoList";
import "../styles/App.css";
import Navbar from "../components/navbar";

const App = () => {
  const [lastVideoAdded, setLastVideoAdded] = useState(null); // Estado para el último video agregado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastVideo = async () => {
      try {
        const response = await fetch("http://localhost:3001/videos");
        if (!response.ok) {
          throw new Error("Error al obtener los videos");
        }

        const data = await response.json();

        // Obtener el último video agregado
        if (data.length > 0) {
          setLastVideoAdded(data[data.length - 1]); // Último en el arreglo
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLastVideo();
  }, []);

  if (loading) {
    return <p>Cargando videos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navbar  />
      {lastVideoAdded && <Preview data={lastVideoAdded} />} {/* Último video agregado */}
      <VideoList category="Front End" />
      <VideoList category="Back End" />
      <VideoList category="Innovación y Gestión" />
    </>
  );
};

export default App;
