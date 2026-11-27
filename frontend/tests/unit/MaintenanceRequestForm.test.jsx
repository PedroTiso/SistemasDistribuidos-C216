import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MaintenanceRequestForm from "../../src/components/MaintenanceRequestForm.jsx";

describe("MaintenanceRequestForm", () => {
  it("submits a valid maintenance request and clears the fields", () => {
    const onAdd = vi.fn();
    render(<MaintenanceRequestForm onAdd={onAdd} />);

    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: "Teclado quebrado" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: "Algumas teclas não respondem." },
    });
    fireEvent.change(screen.getByLabelText(/local/i), { target: { value: "Laboratório 1" } });
    fireEvent.click(screen.getByRole("button", { name: /registrar chamado/i }));

    expect(onAdd).toHaveBeenCalledWith({
      description: "Algumas teclas não respondem.",
      location: "Laboratório 1",
      priority: "medium",
      status: "open",
      title: "Teclado quebrado",
    });
    expect(screen.getByLabelText(/título/i)).toHaveValue("");
  });

  it("keeps the submit button disabled for numeric-only values", () => {
    render(<MaintenanceRequestForm onAdd={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: "11111" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/local/i), { target: { value: "123" } });

    expect(screen.getByRole("button", { name: /registrar chamado/i })).toBeDisabled();
  });
});
