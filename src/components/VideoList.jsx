import React, { useEffect, useState } from "react";
import useCategoryColor from "../hooks/useCategoryColor";
import Modal from "react-modal";
import "./VideoList.css"; // Estilos para el modal y formulario

Modal.setAppElement("#root"); // Necesario para accesibilidad

const VideoList = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
  const [currentVideo, setCurrentVideo] = useState(null); // Video que se está editando

  const categoryColor = useCategoryColor(category);

  useEffect(() => {
    const fetchVideosByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3001/videos?category=${encodeURIComponent(category)}`);
        if (!response.ok) {
          throw new Error(`Error al obtener los videos de la categoría: ${category}`);
        }
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideosByCategory();
  }, [category]);

  // Función para abrir el modal y establecer el video actual
  const handleEditClick = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  // Función para guardar los cambios del video
  const handleSave = async (updatedVideo) => {
    try {
      const response = await fetch(`http://localhost:3001/videos/${updatedVideo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar el video: ${response.statusText}`);
      }

      const data = await response.json();

      // Actualizar la lista de videos localmente
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.id === data.id ? data : video))
      );

      handleCloseModal();
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
    }
  };

  // Función para eliminar un video
  const handleDeleteClick = async (videoId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este video?")) {
      try {
        const response = await fetch(`http://localhost:3001/videos/${videoId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el video");
        }

        // Actualizar la lista de videos localmente
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      } catch (err) {
        console.error("Error al eliminar el video:", err);
      }
    }
  };

  if (loading) {
    return <p>Cargando videos de {category}...</p>;
  }

  if (error) {
    return <p>Error al cargar los videos: {error}</p>;
  }

  return (
    <section className="videos">
      <h2 className="videos__title" style={{ backgroundColor: categoryColor }}>
        {category}
      </h2>
      <ul className="videos__list">
        {videos.map((video) => (
          <li
            className="videos__item"
            key={video.id}
            style={{ border: `solid 3px ${categoryColor}` }}
          >
            <div className="video">
              <iframe
                className="video__frame"
                src={video.videoUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="video__controls" style={{ borderTop: `solid 3px ${categoryColor}` }}>
                <button
                  className="video__button video__button--edit"
                  onClick={() => handleEditClick(video)}
                >
                  <img src="img/edit.png" alt="Editar" />Editar
                </button>
                <button
                  className="video__button video__button--delete"
                  onClick={() => handleDeleteClick(video.id)}
                >
                  <img src="img/trash.png" alt="Borrar" />Borrar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para editar el video */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Editar Video"
          className="video-card"
          overlayClassName="modal-overlay"
        >
          <div className="video-card">
            <form
              
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(currentVideo); // Guardar cambios
              }}
            >
              <h1 className="video-card__title">Editar Video</h1>

              <p className="video-card__description">
                Complete el formulario para actualizar la tarjeta del video
              </p>

              <h3 className="video-card__subtitle">Actualizar Video</h3>

              <div className="video-card__form-grid">
                <div className="video-card__form-group">
                  <label htmlFor="title" className="video-card__label">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="video-card__input"
                    value={currentVideo.title}
                    onChange={(e) =>
                      setCurrentVideo({ ...currentVideo, title: e.target.value })
                    }
                    maxLength="50"
                    required
                  />
                </div>

                <div className="video-card__form-group">
                  <label htmlFor="category" className="video-card__label">
                    Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="video-card__input"
                    value={currentVideo.category}
                    onChange={(e) =>
                      setCurrentVideo({ ...currentVideo, category: e.target.value })
                    }
                    required
                  >
                    <option value="Tecnología">Tecnología</option>
                    <option value="Educación">Educación</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                  </select>
                </div>

                <div className="video-card__form-group">
                  <label htmlFor="imageUrl" className="video-card__label">
                    URL de Imagen
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    className="video-card__input"
                    value={currentVideo.image}
                    onChange={(e) =>
                      setCurrentVideo({ ...currentVideo, image: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="video-card__form-group">
                  <label htmlFor="videoUrl" className="video-card__label">
                    URL del Video
                  </label>
                  <input
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    className="video-card__input"
                    value={currentVideo.videoUrl}
                    onChange={(e) =>
                      setCurrentVideo({ ...currentVideo, videoUrl: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="video-card__form-group video-card__form-group--description">
                <label htmlFor="description" className="video-card__label">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="video-card__textarea"
                  rows="8"
                  value={currentVideo.description}
                  onChange={(e) =>
                    setCurrentVideo({ ...currentVideo, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              <button type="submit" className="video-card__submit">
                Guardar
              </button>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default VideoList;
