import MyHead from "../components/MyHead";
import Link from "next/link";

export default function animationAide() {
  return (
    <>
      <MyHead title="Aide E-Commerce"></MyHead>
      <h2>Le mode E-Commerce</h2>

      <p>
        Le mode E-Commerce vous permet de prendre des photos statiques, pour
        votre boutique en ligne. Vous pouvez sélectionner jusqu&apos;à 24 angles
        différents. La prise de photos s&apos;effectuera automatiquement et le
        plateau tournant s&apos;arrêtera sur l&apos;angle de vue que vous avez choisi.{" "}
      </p>

      <p>
        <b>- Choisir les angles :</b> CSert à sélectionner les angles de vue, en
        sélectionnant les cases (une fois sélectionné, la case apparaîtra en
        vert).
      </p>

      <p>
        <b>- Prendre les photos :</b> Sert à démarrer le processus de prise de
        photo en mode automatique ainsi que le plateau tournant automatisé.
      </p>

      <p>
        <b>- Caméra test :</b> Ceci sert à prendre une photo test, afin de
        vérifier le résultat sur l&apos;écran de votre appareil photo.
      </p>

      <p>
        <b>- Boutons des flèche :</b> ← pour faire tourner le plateau dans le
        sens horaire et la flèche droite → pour tourner dans le sens
        antihoraire.
      </p>
      <div className="footer">
        <Link href="/ecom">
          <button className="helpButton animateButton">X</button>
        </Link>
      </div>
    </>
  );
}
