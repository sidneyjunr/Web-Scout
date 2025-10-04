import React from "react";

export const ConfirmModal = ({ open, title, message, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
