import MyHead from "../../components/MyHead";
import Link from "next/link";

export default function animationAide() {
  return (
    <>
      <MyHead title="Aide Mode Manuel"></MyHead>
      <h2>Le mode manuel</h2>

      <p>
        Le mode manuel vous permet d’utiliser tous les genres d’appareil photos,
        incluant les téléphones intelligents. Vous pouvez diriger le plateau en
        appuyant sur le bouton « Tournez une position » et prendre la photo de
        l’angle que vous souhaitez.
      </p>

      <p>
        <b>- Tourner une position :</b> Ceci vous permet de faire tourner le
        plateau et de faire avancer le plateau d’une position.
      </p>

      <p>
        <b>- Caméra :</b> Ceci vous permet de prendre une photo si votre
        appareil photo est connecté au plateau.
      </p>

      <p>
        <b>- Annuler :</b> Ceci annule le processus et remet le compteur à zéro.
      </p>

      <p>
        <b>- Boutons des flèches :</b> ← pour faire tourner le plateau dans le
        sens horaire et la flèche droite → pour tourner dans le sens
        antihoraire.
      </p>
      <div className="footer">
        <Link href="/manuel">
          <button className="helpButton animateButton">X</button>
        </Link>
      </div>
    </>
  );
}
