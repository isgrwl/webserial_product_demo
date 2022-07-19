import Link from "next/link";

export default function Navbar(props) {
  return (
    <div className="d-flex justify-content-around align-items-center p-3 m-3">
      <Link href="/">
        <img src="/imgs/Logo-couleur.jpg" className="img-fluid navImg" />
      </Link>
      <h2>{props.title}</h2>
      <div className="d-flex">
        <Link href="/manuel">
          <div>
            <img src="/imgs/Aller.png" className="returnArrow" />
            Manuel
          </div>
        </Link>
        <Link href="/animation">
          <div>
            <img src="/imgs/Aller.png" className="returnArrow" />
            360
          </div>
        </Link>
        <Link href="/ecom">
          <div>
            <img src="/imgs/Aller.png" className="returnArrow" />
            E-Com
          </div>
        </Link>
      </div>
    </div>
  );
}
