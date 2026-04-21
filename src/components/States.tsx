import React from "react";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function LoadingState() {
  return (
    <div className="state-box" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Cargando movimientos...</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-box error" role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry} className="ghost-btn">
        Reintentar
      </button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="state-box" role="status" aria-live="polite">
      <p>No hay resultados para tu filtro actual.</p>
    </div>
  );
}
