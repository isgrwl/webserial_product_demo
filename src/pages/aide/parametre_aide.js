import MyHead from "@ui/MyHead";
import Link from "next/link";

export default function animationAide() {
  return (
    <>
      <MyHead title="Aide Parametres"></MyHead>
      <h2>Le mode Prise de vue animation 360°</h2>
      <h2>Les paramètres</h2>

      <p>
        Les paramètres d&apos;animations 360° vous sert à sélectionner les options
        pour automatiser le plateau et votre appareil photo.
      </p>

      <p>
        <b>- Choisir le nombre de photos :</b> Vous pouvez choisir de 24 à 120
        photos pour créer une animation 360°.
      </p>
      <p style={{ color: "#FF0000" }}>
        ** Nous vous recommandons 40 photos pour obtenir un résultat optimal **
      </p>

      <p>
        <b>- Choisir un délai en secondes pour recharger les flashes :</b> Ceci
        vous permet de donner un délai entre chaque photo qui correspond au
        temps de recharge de votre flash.
      </p>

      <p>
        <b>- Choisir la vitesse de rotation :</b> Le plateau tournant possède 5
        vitesses. La vitesse 1 est la plus lente.
      </p>

      <p>
        <b>- Choisir l&apos;angle du laser :</b> La croix du laser est projetée au
        centre du plateau et elle peut être tourné pour vous offrir l&apos;angle
        désirée (variable de 0 à 90°).
      </p>

      <p>
        <b>- Sens de la rotation :</b>Vous pouvez choisir la flèche gauche 
        pour faire tourner le plateau dans le sens horaire et la flèche droite 
        pour tourner dans le sens antihoraire.
      </p>

      <p>
        <b>- État de la croix laser :</b> Ceci sert à activer ou désactiver la
        croix laser.
      </p>
      <div className="footer">
        <Link href="/parametre">
          <button className="helpButton animateButton">X</button>
        </Link>
      </div>
    </>
  );
}
