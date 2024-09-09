# Aplicación de Recetas de Cocina

![](assets/readme/recipelist.png)

## Descripción

Esta es una aplicación de recetas de cocina desarrollada en React. La aplicación permite a los usuarios gestionar recetas de cocina, incluyendo crear, leer, actualizar y eliminar recetas. Los usuarios pueden gestionar sus propias recetas y realizar seguimiento de recetas de otros usuarios. Los datos se almacenan en `localStorage` para persistencia en el navegador.

## Características

- **Gestión de Recetas**: CRUD (Crear, Leer, Actualizar, Eliminar) para recetas.
- **Autenticación de Usuarios**: Inicio de sesión para gestionar recetas privadas.
- **Persistencia de Datos**: Uso de `localStorage` para guardar recetas y estado de la aplicación.
- **Rutas Dinámicas**: Las rutas cambian dinámicamente según el estado de autenticación del usuario.

![](assets/readme/recipedetail.png)

## Tecnologías

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **React Router**: Para la gestión de rutas y navegación en la aplicación.
- **localStorage**: Para la persistencia de datos en el navegador.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Did11/oliva-recipes-app.git
    ```

2. Navega hacia el directorio:
    ```bash
    cd oliva-recipes-app/recipes-app
    ```

3. Instala las dependencias:
   ```bash
   npm install
    ```

4. Ejecuta la aplicacion:
    ```bash
    npm run dev
    ```

5. Abre tu navegador y visita http://localhost:5173/ para ver la aplicación en funcionamiento.