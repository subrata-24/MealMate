import React from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md my-8 bg-white rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="sticky top-4 left-full ml-auto mr-4 z-10 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1"
          onClick={onClose}
        >
          <RxCross2 size={24} />
        </button>

        {/* Modal Content */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
