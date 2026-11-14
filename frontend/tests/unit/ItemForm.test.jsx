import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ItemForm from "../../src/components/ItemForm";

describe("ItemForm", () => {
  it("shows an error when the name is empty", () => {
    render(<ItemForm onAdd={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("O nome é obrigatório.");
  });

  it("submits valid values and clears the fields", async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(<ItemForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText(/Nome/), { target: { value: "Notebook" } });
    fireEvent.change(screen.getByLabelText(/Descrição/), {
      target: { value: "Material da disciplina" },
    });
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAdd).toHaveBeenCalledWith({ name: "Notebook", description: "Material da disciplina" });
    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/)).toHaveValue("");
      expect(screen.getByLabelText(/Descrição/)).toHaveValue("");
    });
  });
});
