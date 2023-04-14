import { useModal } from "../../../context/Modal"
import OpenModelButtonCSS from "./OpenModalButton.module.css"

export default function OpenModelButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  styleSheet,
  styleClassNames
}) {
  const { setModalContent, setOnModalClose } = useModal();

  function handlClick() {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose();
    setModalContent(modalComponent);
  }

  return (
    <>
      <button className={OpenModelButtonCSS["button"]} onClick={handlClick}>{buttonText}</button>
    </>
  );
}
