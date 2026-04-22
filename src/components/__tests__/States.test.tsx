import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EmptyState, ErrorState, LoadingState } from "../States";

describe("Estados de UI", () => {
  it("renderiza loading state", () => {
    render(<LoadingState />);

    expect(screen.getByRole("status")).toHaveTextContent("Cargando movimientos");
  });

  it("permite reintentar en estado de error", () => {
    const onRetry = vi.fn();

    render(<ErrorState message="Error de red" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renderiza estado vacio", () => {
    render(<EmptyState />);

    expect(screen.getByText("No hay resultados para tu filtro actual.")).toBeInTheDocument();
  });
});
