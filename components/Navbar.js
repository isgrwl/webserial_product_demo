import Link from "next/link";

export default function Navbar(props) {
  return (
    <div className="d-flex justify-content-around align-items-center p-3 m-3">
      <Link href="/">
        <img src="/imgs/Logo-couleur.jpg" className="img-fluid navImg" />
      </Link>
      <h2>{props.children}</h2>
      <Link href={props.path || "/parametre"}>
        <div>
          <img src="/imgs/return-arrow.png" className="returnArrow" />
        </div>
      </Link>
    </div>
  );
}
