export default function PairedBox(props) {
  return (
    <div className="d-flex position-absolute w-100">
      <div
        className="pairedBox col-1 mx-2 text-center"
        style={{ backgroundColor: props.paired ? "green" : "red" }}
      >
        {props.paired ? "Paired" : "Not Paired"}
      </div>
      <div className="warningText col mx-2 text-center">
        {props.paired ? "" : "Please pair your device in the connect section"}
      </div>
    </div>
  );
}
