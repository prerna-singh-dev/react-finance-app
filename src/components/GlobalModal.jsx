import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function GlobalModal({
  children,
  ariaLabel = "Dialog",
  ariaBusy = false,
  onClose = () => {},
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.focus();
  }, []);

  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-[2px]">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-busy={ariaBusy}
          tabIndex={-1}
          className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 pt-12 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:max-w-md"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-3 top-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-lg leading-none text-slate-600 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div>{children}</div>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default GlobalModal;
