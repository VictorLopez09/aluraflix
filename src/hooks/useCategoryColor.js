// src/hooks/useCategoryColor.js
const useCategoryColor = (category) => {
    const categoryColors = {
      "Front End": "#219fde", // Azul
      "Back End": "#00C86F", // Rojo
      "Innovación y Gestión": "#FFBA05", // Verde
      
    };
  
    // Devuelve el color correspondiente o un color por defecto
    return categoryColors[category] || "#000"; // Negro por defecto
  };
  
  export default useCategoryColor;
  