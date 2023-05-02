import style from "css/modules/Buttons.module.sass"
import Link from "next/link"

export default function NavButton(props) {
    return (
        <Link href={props.href}>
            <button className={`${style.navButton} ${style.animateButton} w-100 flex-fill`}>
                {props.children}
            </button>
        </Link>
    )
}