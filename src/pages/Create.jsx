import React, { useState } from "react";
import Navbar from "../components/navbar";
import "./Create.css";

const CreateVideoPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        imageUrl: "",
        videoUrl: "",
        description: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/videos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al crear el video");
            }

            const data = await response.json();
            console.log("Video creado:", data);

            setSuccessMessage("¡Video creado exitosamente!");
            setErrorMessage("");

            // Reinicia el formulario
            setFormData({
                title: "",
                category: "",
                imageUrl: "",
                videoUrl: "",
                description: "",
            });
        } catch (error) {
            console.error("Error al crear el video:", error);
            setErrorMessage("Hubo un problema al crear el video. Inténtalo de nuevo.");
            setSuccessMessage("");
        }
    };

    return (
        <>
            <Navbar />
            <section className="create-video__container">
                <div className="create-video__card">
                    <form className="create-video__form" onSubmit={handleSubmit}>
                        <h1 className="create-video__title">Nuevo Video</h1>

                        <p className="create-video__description">
                            Complete el formulario para crear una nueva tarjeta de video
                        </p>

                        <h3 className="create-video__subtitle">Agregar Video</h3>

                        <div className="create-video__form-grid">
                            <div className="create-video__form-group">
                                <label htmlFor="title" className="create-video__label">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="create-video__input"
                                    maxLength="50"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="create-video__form-group">
                                <label htmlFor="category" className="create-video__label">
                                    Categoría
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="create-video__input"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Seleccione una categoría
                                    </option>
                                    <option value="Front End">Front End</option>
                                    <option value="Back End">Educación</option>
                                    <option value="Innovación y Gestión">Entretenimiento</option>
                                </select>
                            </div>

                            <div className="create-video__form-group">
                                <label htmlFor="imageUrl" className="create-video__label">
                                    URL de Imagen
                                </label>
                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    className="create-video__input"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="create-video__form-group">
                                <label htmlFor="videoUrl" className="create-video__label">
                                    URL del Video
                                </label>
                                <input
                                    type="url"
                                    id="videoUrl"
                                    name="videoUrl"
                                    className="create-video__input"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="create-video__form-group create-video__form-group--description">
                            <label htmlFor="description" className="create-video__label">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="create-video__textarea"
                                rows="8"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="create-video__submit">
                            Enviar
                        </button>

                        {/* Mensajes de éxito o error */}
                        {successMessage && <p className="create-video__success">{successMessage}</p>}
                        {errorMessage && <p className="create-video__error">{errorMessage}</p>}
                    </form>
                </div>
            </section>
        </>
    );
};

export default CreateVideoPage;
