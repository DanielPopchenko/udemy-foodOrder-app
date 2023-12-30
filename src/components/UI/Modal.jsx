import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, open, className }) => {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      // closing
    }
  }, [open]);

  const cssClasses = className ? `modal ${className}` : 'modal';
  return createPortal(
    <dialog ref={dialog} className={cssClasses}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  );
};

export default Modal;
