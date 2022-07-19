import MyHead from "../components/MyHead";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <MyHead title="Plateau Revolutionnez"></MyHead>

      <div className="container-fluid d-flex align-items-center">
        {/**<div className="d-flex justify-content-end">
          <h1 className="titre display-1 p-5">Plateau Révolutionnez</h1>
        </div>
       */}

        <div className="row d-flex flex-wrap align-items-center flex-wrap fullHeight">
          {/**Logo */}
          <div className="col d-flex justify-content-center align-items-center logo">
            <img
              src="./imgs/Logo-couleur.jpg"
              alt="Logo"
              className="img-fluid"
            />
          </div>
          {/**Menu and Text logo */}
          <div className="col d-flex flex-column  justify-content-evenly fullHeight">
            {/**Menu */}
            <div className="row flex-column align-items-center justify-content-evenly h-50 ">
              <Link href="/animation">
                <button className="animateButton navButton w-50 flex-fill">
                  Animations 360°
                </button>
              </Link>
              <Link href="/ecom">
                <button className="navButton animateButton w-50 flex-fill">
                  Photos E-Commerce
                </button>
              </Link>
              <Link href="/manuel">
                <button className="navButton animateButton w-50 flex-fill">
                  Mode Manuel
                </button>
              </Link>
              <Link href="/parametre">
                <button className="navButton animateButton w-50 flex-fill">
                  Paramètres
                </button>
              </Link>
              <Link href="/connection">
                <button className="navButton animateButton w-50 flex-fill">
                  Connection
                </button>
              </Link>
            </div>

            {/**Text logo */}
            <div className="row d-flex align-items-center logo">
              <img src="/imgs/text-logo.jpg" alt="Logo" className="img-fluid" />
            </div>
          </div>
        </div>
        {/**Help button */}
        <Footer path="/index_aide"></Footer>
      </div>
    </div>
  );
}
