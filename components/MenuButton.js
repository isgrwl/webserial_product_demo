export default function MenuButton(props) {
  return (
    <button
      className={`navButton w-75 animateButton`}
      id={props.id ? props.id : null}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
