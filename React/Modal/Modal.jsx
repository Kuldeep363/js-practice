import { useEffect } from "react";

export const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    const container = document.querySelector(".modal-container");
    container.addEventListener("click", (e) => {
      onClose();
    });
    const innerBody = document.querySelector(".modal-inner-body");
    innerBody.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
      onClose();
    });
    return () => {
      container.removeEventListener("click", (e) => {
        onClose();
      });
      innerBody.removeEventListener("click", (e) => {
        e.stopPropagation();
      });
      close.removeEventListener("click", () => {
        onClose();
      });
    };
  }, [open]);
  return (
    <div className="modal-wrapper" style={{ display: open ? "block" : "none" }}>
      <div className="modal-backdrop">
        <div className="modal-container">
          <div className="modal-inner-body">
            <div className="close">x</div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
