import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import ModalCSS from "./Modal.module.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);
  const [modalClass, setModalClass] = useState({})

  // console.log("context modal class", modalClass)

  const closeModel = () => {
    setModalContent(null);
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModel,
    setModalClass,
    modalClass
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModel, modalClass } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id="modal" className={modalClass.container || ModalCSS.modal}>
    {/* {console.log("ModalContext: ", modalClass)} */}
      <div
        id="modal-background"
        className={modalClass.background || ModalCSS.background}
        onClick={closeModel}
      />
      <div id="modal-content" className={modalClass.content || ModalCSS.content}>
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
