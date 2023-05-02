import style from "css/modules/Params.module.sass"

export default function MenuNumber(props) {
  return (
    <div
      type="menuOption"
      className="d-flex justify-content-between w-75 align-items-center"
    >
      <span>{props.children}</span>
      <input type="number" className={style.numberDisplay} defaultValue={props.val || 0} disabled readOnly></input>
    </div>
  );
}
