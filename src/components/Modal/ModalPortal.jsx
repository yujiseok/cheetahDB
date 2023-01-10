import ReactDOM, { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  const modalContainer = document.getElementById("modal-container");

  return ReactDOM.createPortal(children, modalContainer);
};
export default ModalPortal;
