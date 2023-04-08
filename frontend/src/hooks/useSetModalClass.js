import { useEffect } from "react";
import { useModal } from "../context/Modal";

export default function useSetModalClass(classNames) {
  const { setModalClass } = useModal();
  const {container, background, content} = classNames
 
  console.log(classNames.background)
  useEffect(() => {
    if (container && background && content) {
      setModalClass({
        container,
        background,
        content
      });
    } else {
        setModalClass({})
    }
  }, [setModalClass, container, background, content]);
}
