import MyHead from "../../components/MyHead";
import Link from "next/link";

export default function indexAide() {
  return (
    <>
      <MyHead title="Animations 360"></MyHead>

      <h2 className="mt-5">Notre plateau tournant automatisé</h2>
      <p>
        Notre plateau tournant automatisé, vous permet de sélectionner 3 modes.
        Assurez-vous de connecter votre appareil photo au plateau tournant, si
        vous souhaitez utiliser le mode Animations 360° et Photos E-Commerce.
      </p>

      <p>
        {" "}
        1. Animations 360° : Ce mode vous permet de prendre une série de photos.
        La prise de photos seffectuera automatiquement et le plateau automatisé
        tournera afin d&#39;effectuer une rotation 360°.
      </p>

      <p>
        2. Photos E-Commerce : Ce mode vous permet de prendre des photos
        statiques pour votre boutique en ligne. La prise de photos s&#39;effectuera
        automatiquement et le plateau tournant s&#39;arrêtera sur l&#39;angle de vue que
        vous avez choisi.
      </p>

      <p>
        3. Mode manuel : Le mode manuel vous permet d&#39;utiliser tous les genres
        d&#39;appareil photos, incluant les téléphones intelligents avec le plateau
        tournant. Vous pouvez diriger le plateau en appuyant sur le bouton «
        Tournez une position » et prendre la photo de l&#39;angle que vous
        souhaitez.
      </p>

      <p>
        4. Paramètres : Ceci vous permet d&#39;accéder aux paramètres d&#39;animations
        360° afin de sélectionner les options pour automatiser le plateau et
        votre appareil photo.
      </p>
      <div className="footer">
        <Link href="/">
          <button className="helpButton animateButton">X</button>
        </Link>
      </div>
    </>
  );
}
