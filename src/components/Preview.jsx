import React from "react";
import useCategoryColor from "../hooks/useCategoryColor";
import "./Preview.css";

const Preview = ({ data }) => {

  const categoryColor = useCategoryColor(data.category); // Llamada al hook
  
  return (
    <section className="preview">
      <div className="preview__content">
        <span
          className="preview__category"
          style={{ backgroundColor: categoryColor }} // Color dinámico según categoría
        >
          {data.category}
        </span>
        <h2 className="preview__title">{data.title}</h2>
        <p className="preview__description">{data.description}</p>
      </div>
      <div className="preview__video" style={{  boxShadow: `0 5px 15px ${categoryColor}` }}>
        <iframe
          className="preview__video-frame"
          src={data.videoUrl}
          title={data.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          
        ></iframe>
      </div>
    </section>
  );
};

export default Preview;
