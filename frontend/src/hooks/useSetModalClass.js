import { useEffect } from "react";
import { useModal } from "../context/Modal";

export default function useSetModalClass(classNames) {
  const { setModalClass } = useModal();

  useEffect(() => {
    if (!classNames) {
      setModalClass({});
      return;
    }

    if (classNames) {
      setModalClass({
        container: classNames.container,
        background: classNames.background,
        content: classNames.content
      });
    }
  }, []);
}
