import { useModal } from "../../../context/Modal"

export default function OpenModelButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  function handlClick() {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose();
    setModalContent(modalComponent);
  }

  return (
    <>
      <button
        className=""
        onClick={handlClick}>{buttonText}
      </button>
    </>
  );
}
