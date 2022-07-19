export default function MenuRotation({ children }) {
  return (
    <div type="menuOption" className="d-flex justify-content-between w-75 ">
      <span>{children}</span>
      <div className="d-flex flex-column justify-content-center">
        <img src="/imgs/fleche droit-1.jpg" className="img-fluid h-50" />
      </div>
    </div>
  );
}
