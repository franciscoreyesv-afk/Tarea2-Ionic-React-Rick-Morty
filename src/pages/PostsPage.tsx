import { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import "./PostsPage.css";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: string[];
}

interface ApiResponse {
  info: {
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const PostsPage: React.FC = () => {
  const [personajes, setPersonajes] = useState<Character[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [siguiente, setSiguiente] = useState<string | null>(null);
  const [anterior, setAnterior] = useState<string | null>(null);

  const cargarPersonajes = (
    url: string = "https://rickandmortyapi.com/api/character"
  ) => {
    setCargando(true);
    setError("");

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        return response.json();
      })
      .then((datos: ApiResponse) => {
        setPersonajes(datos.results);
        setSiguiente(datos.info.next);
        setAnterior(datos.info.prev);
      })
      .catch((error) => {
        console.error(error);
        setError("Ocurrió un error al cargar los personajes.");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rick and Morty Wiki</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="intro">
          <h1>Personajes de Rick and Morty</h1>
          <p>
            Presiona el botón para obtener los personajes desde la API de
            Rick and Morty.
          </p>

          <IonButton onClick={() => cargarPersonajes()} disabled={cargando}>
            Cargar personajes
          </IonButton>
        </div>

        {cargando && (
          <div className="estado">
            <IonSpinner />
            <p>Cargando personajes...</p>
          </div>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <div className="characters-container">
          {personajes.map((personaje) => (
            <IonCard key={personaje.id} className="character-card">
              <img
                className="character-image"
                src={personaje.image}
                alt={personaje.name}
              />

              <IonCardHeader>
                <IonCardTitle>{personaje.name}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent className="character-info">
                <p><strong>ID:</strong> {personaje.id}</p>
                <p><strong>Estado:</strong> {personaje.status}</p>
                <p><strong>Especie:</strong> {personaje.species}</p>
                <p><strong>Género:</strong> {personaje.gender}</p>
                {personaje.type && (
                  <p><strong>Tipo:</strong> {personaje.type}</p>
                )}
                <p><strong>Origen:</strong> {personaje.origin.name}</p>
                <p><strong>Ubicación:</strong> {personaje.location.name}</p>
                <p><strong>Episodios:</strong> {personaje.episode.length}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {personajes.length > 0 && (
          <div className="paginacion">
            <IonButton
              fill="outline"
              disabled={!anterior || cargando}
              onClick={() => anterior && cargarPersonajes(anterior)}
            >
              Anterior
            </IonButton>

            <IonButton
              fill="outline"
              disabled={!siguiente || cargando}
              onClick={() => siguiente && cargarPersonajes(siguiente)}
            >
              Siguiente
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PostsPage;
