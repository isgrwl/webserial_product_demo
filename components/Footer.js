import Link from "next/link";

export default function Footer(props) {
  return (
    <div className="footer d-flex justify-content-end ">
      <Link href={props.path || "/"}>
        <button className="helpButton animateButton">?</button>
      </Link>
    </div>
  );
}
