# Rick and Morty Wiki - Ionic + React

## Descripción

Aplicación web desarrollada con **Ionic + React** que consume la API pública de Rick and Morty para obtener y visualizar información de los personajes de la serie.

Los datos se muestran dinámicamente mediante tarjetas de Ionic, incluyendo información relevante de cada personaje.

API utilizada:

`https://rickandmortyapi.com/api/character`

## Proceso realizado

La aplicación fue desarrollada tomando como referencia lo trabajado previamente en el Taller 4 sobre consumo de APIs con Ionic + React.

Para su implementación se realizaron las siguientes etapas:

1. Se definió una interfaz `Character` para representar la estructura de los datos recibidos desde la API.
2. Se utilizaron estados de React mediante `useState` para almacenar los personajes, controlar el estado de carga, manejar errores y gestionar la paginación.
3. Se realizó la solicitud HTTP a la API utilizando `fetch()`.
4. La respuesta obtenida se procesa desde `datos.results`, donde se encuentra la información de los personajes.
5. Los personajes se muestran dinámicamente mediante `map()` utilizando componentes `IonCard` de Ionic.
6. Se incorporó un indicador de carga mediante `IonSpinner`.
7. Se implementó manejo de errores en caso de que la solicitud a la API no pueda completarse.
8. Se utilizaron los campos `info.next` e `info.prev` entregados por la API para navegar entre las distintas páginas de resultados.

## Información mostrada

Para cada personaje se presenta la siguiente información:

- Imagen
- ID
- Nombre
- Estado
- Especie
- Género
- Tipo, cuando existe
- Origen
- Ubicación actual
- Cantidad de episodios en los que aparece

## Ejecución del proyecto

Para ejecutar la aplicación localmente, primero se debe ingresar a la carpeta del proyecto e instalar las dependencias:

```bash
npm install
