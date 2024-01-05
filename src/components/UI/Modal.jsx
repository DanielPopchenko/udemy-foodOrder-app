import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, open, className }) => {
  const dialog = useRef();

  useEffect(() => {
    // ! We lock in the value that is valid by the time useEffect executes
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    // ! This function will run only if the value of [open] changes
    return () => modal.close();
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
