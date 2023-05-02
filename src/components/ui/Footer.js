import Link from "next/link";
import buttonsStyle from "css/modules/Buttons.module.sass"

export default function Footer(props) {
  return (
    <div className="footer position-absolute" style={{right:0,bottom:0}}>
      <Link href={`/aide/${props.path}`}>
        <button className={`${buttonsStyle.helpButton} ${buttonsStyle.animateButton} p-1`}>?</button>
      </Link>
    </div>
  );
}
