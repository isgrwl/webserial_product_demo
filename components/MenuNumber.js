export default function MenuNumber(props) {
  return (
    <div
      type="menuOption"
      className="d-flex justify-content-between w-75 align-items-center"
    >
      <span>{props.children}</span>
      <input type="number" defaultValue={props.val || 0} disabled></input>
    </div>
  );
}
