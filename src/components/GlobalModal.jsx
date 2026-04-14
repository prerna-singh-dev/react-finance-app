import { Children } from "react";
import { createPortal } from "react-dom";

function GlobalModal({ children }) {
  return createPortal(
    <>
      <div className="fixed bg-gray-900/50 inset-0 z-50 flex justify-center items-center">
        <div className="w-1/4 h-28 bg-white z-50 flex justify-center items-center rounded-lg p-6 m-auto">
          <span>x</span>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}

export default GlobalModal;
