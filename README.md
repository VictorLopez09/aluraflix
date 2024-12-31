# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Create Video Page

Este proyecto es una aplicación React para gestionar y crear videos, donde puedes:
- 📥 Agregar nuevos videos con detalles como título, categoría, URL de imagen, URL de video y descripción.
- 📂 Ver y administrar videos organizados por categoría.

## Características

### 1. Creación de videos
- 📝 Formulario para ingresar los detalles del video:
  - 🏷️ Título
  - 🗂️ Categoría
  - 🌄 URL de imagen
  - 🎥 URL de video
  - 🖊️ Descripción
- ✅ Validación de campos obligatorios.
- ✉️ Mensajes de éxito y error al agregar un video.

### 2. Organización por categoría
- 📋 Los videos se agrupan por categorías como "Front End", "Back End" e "Innovación y Gestión".
- 👁️ Vista previa del último video agregado.

### 3. Edición y eliminación (Opcional)
- ✏️ Editar los videos existentes mediante un modal.
- 🗑️ Eliminar videos con confirmación.

## Tecnologías utilizadas

- ⚛️ **React**: Biblioteca principal para la interfaz de usuario.
- 🌐 **Fetch API**: Para realizar peticiones HTTP a un servidor JSON.
- 🎣 **React Hooks**: Uso de `useState` y `useEffect` para gestionar estados y ciclos de vida del componente.
- 🎨 **CSS**: Estilos personalizados con clases únicas como `create-video__` para evitar conflictos.

## Estructura del proyecto

```
/src
|-- /components
|   |-- Navbar.jsx        # Barra de navegación
|   |-- Preview.jsx       # Vista previa del último video agregado
|   |-- VideoList.jsx     # Lista de videos agrupados por categoría
|-- /pages
|   |-- CreateVideoPage.jsx # Página para crear videos
|-- /styles
|   |-- CreateVideoPage.css # Estilos únicos para la página de creación
```

## Instalación y configuración

### Requisitos previos
- 🛠️ Node.js y npm instalados en tu sistema.
- 🗄️ Un servidor JSON para gestionar datos (como [JSON Server](https://github.com/typicode/json-server)).

### Pasos
1. 🔄 Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```
2. 📦 Instala las dependencias:
    ```bash
    npm install
    ```
3. ▶️ Inicia el servidor JSON:
    ```bash
    npx json-server --watch db.json --port 3001
    ```
    Asegúrate de que `db.json` contiene una estructura inicial como esta:
    ```json
    {
      "videos": []
    }
    ```
4. ▶️ Inicia la aplicación React:
    ```bash
    npm start
    ```
5. 🌐 Abre la aplicación en [http://localhost:3000](http://localhost:3000).

## Uso

### Crear un video
1. 🖊️ Navega a la página de creación.
2. ✍️ Llena todos los campos del formulario.
3. 📤 Haz clic en "Enviar".
4. ✅ Si todo es correcto, recibirás un mensaje de éxito y el formulario se reiniciará.

### Ver videos
- 🎞️ Los videos se muestran agrupados por categoría en listas individuales.

## Personalización
- ⚙️ Puedes modificar las categorías disponibles editando el componente de selección en `CreateVideoPage.jsx`.
- 🎨 Cambia los estilos modificando `CreateVideoPage.css` o agregando nuevos estilos.



## Licencia
Este proyecto está bajo la Licencia MIT.

