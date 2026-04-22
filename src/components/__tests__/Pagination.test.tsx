import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "../Pagination";

describe("Pagination", () => {
  it("muestra solo cinco paginas por ventana", () => {
    render(<Pagination totalItems={100} pageSize={10} currentPage={1} onPageChange={() => {}} />);

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "6" })).not.toBeInTheDocument();
  });

  it("avanza a la siguiente ventana de cinco paginas", () => {
    const onPageChange = vi.fn();

    render(
      <Pagination totalItems={100} pageSize={10} currentPage={1} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));

    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("deshabilita el boton anterior en la primera ventana y el final en la ultima", () => {
    const { rerender } = render(
      <Pagination totalItems={100} pageSize={10} currentPage={1} onPageChange={() => {}} />
    );

    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Inicio" })).toBeDisabled();

    rerender(<Pagination totalItems={100} pageSize={10} currentPage={10} onPageChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Final" })).toBeDisabled();
  });
});
