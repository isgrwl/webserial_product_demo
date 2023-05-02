import Link from "next/link";
import Image from "next/image";
import style from "css/modules/Components.module.sass"
export default function ParamsNavbar(props) {
  return (
    <div className="row d-flex flex-nowrap justify-content-center align-items-center m-3 h-25 w-100">
      {/**Logo */}
      <div className="col-2 position-relative h-75">
        <Link href="/">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image src="/imgs/Logo-couleur.jpg" alt="->Home" className="img-fluid navImg" layout="fill" objectFit="contain" />
          </div>
        </Link>
      </div>
      {/**Title */}
      <div className="col-7 position-relative h-100 d-flex align-items-center justify-content-center">
        <h2>{props.children}</h2>
      </div>
      {/**Nav Arrows */}
      <div className="col-2 h-100  d-flex justify-content-center align-items-center position-relative ">
        <div className="col h-50 position-relative ">
          <Link href={"/animation"}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src="/imgs/return-arrow.png" alt="->animation" className="returnArrow" layout="fill" object-fit="contain" />
            </div>
          </Link>
        </div>
        <div className="col h-50 position-relative ">
          <Link href={"/manuel"}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src="/imgs/return-arrow.png" alt="->manuel" className="returnArrow" layout="fill" object-fit="contain" />
            </div>
          </Link>
        </div>
        <div className="col h-50 position-relative ">
          <Link href={"/ecom"}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src="/imgs/return-arrow.png" alt="->ecom" className="returnArrow" layout="fill" object-fit="contain" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
