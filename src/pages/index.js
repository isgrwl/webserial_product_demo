import MyHead from "@ui/MyHead";
import Footer from "@ui/Footer";
import Image
  from "next/image";
import NavButton from "@ui/NavButton";

export default function Home() {
  return (
    <>
      {/**Head tag */}
      <MyHead title="Plateau Revolutionnez"></MyHead>
      {/**Body container */}
      <div className="container-fluid d-flex align-items-center justify-content-center vw-100 vh-100 p-5">
        <div className="d-flex w-75 h-75">
          {/**Logo */}
          <div className="col position-relative ">
            <Image
              src="/imgs/Logo-couleur.jpg"
              alt="360Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          {/**Menu and Text logo */}
          <div className="col d-flex flex-column justify-content-evenly align-items-center">
            {/**Menu */}
            <div className="row h-75 w-75">
              <div className="d-flex flex-column align-items-center justify-content-evenly h-100 ">
                <NavButton href="animation">Animations 360°</NavButton>
                <NavButton href="ecom">Photos E-Commerce </NavButton>
                <NavButton href="manuel">Mode Manuel</NavButton>
                <NavButton href="parametre">Paramètres</NavButton>
                <NavButton href="connection">Connection</NavButton>
              </div>
            </div>
            {/**Text logo */}
            <div className="row position-relative h-25 w-100 mt-2">
              <Image src="/imgs/text-logo.jpg" alt="Logo Revolutionnez" objectFit="contain" layout="fill" />
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="index_aide"></Footer>
      </div >
    </>
  );
}
