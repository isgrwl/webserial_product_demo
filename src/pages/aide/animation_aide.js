import MyHead from "../@ui/MyHead";
import Link from "next/link";

export default function animationAide() {
  return (
    <>
      <MyHead title="Animation Aide"></MyHead>
      <h2>Le mode Prise de vue animation 360°</h2>

      <p>
        Le mode Prise de vue animation 360° vous permet de prendre une série de
        photos. La prise de photos s&#39;effectuera automatiquement et le
        plateau automatisé tournera afin d&#39;effectuer une rotation 360°.
      </p>
      <p style={{ color: "red" }}>
        ** Pour créer une animation 360°, nous vous recommandons de prendre 40
        photos pour obtenir un résultat optimal **{" "}
      </p>

      <p>
        <b>- Démarrer :</b> Ceci vous permet de déclencher le processus de prise
        de photos en mode automatique et de faire tourner le plateau.
      </p>

      <p>
        <b>- Pause : </b> Sert à mettre en pause la rotation du plateau. Ceci
        permet de présenter un mouvement ou une particularité du produit à
        partir de quelques photos additionnelles. (Par exemple, si vous
        photographiez un lave-vaisselle frontales avec un panier réglable, vous
        pouvez photographier en ouvrant la porte en 3 ou 4 sécantes et en
        sortant le panier de 3 ou 4 positions , avec 6 à 8 photos de plus vous
        ajoutez de la vie et présenter intérieur du produit. De la même manière
        si vous avez une chaussure, vous pouvez la tourner et présenter la
        semelle).
      </p>

      <p>
        <b>- Caméra test :</b> Ceci sert à prendre une photo &#34;test&#34;,
        afin de vérifier le résultat sur l&#39;écran de votre appareil photo.
      </p>

      <p>
        <b>- Boutons des flèches :</b> ← pour faire tourner le plateau dans le
        sens horaire et la flèche droite → pour tourner dans le sens
        antihoraire.
      </p>
      <div className="footer">
        <Link href="/animation">
          <button className="helpButton animateButton">X</button>
        </Link>
      </div>
    </>
  );
}
