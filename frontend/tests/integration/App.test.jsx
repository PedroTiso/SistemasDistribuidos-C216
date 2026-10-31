import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("item manager", () => {
  it("adds a new item to the list", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Nome/), { target: { value: "Notebook" } });
    fireEvent.change(screen.getByLabelText(/Descrição/), {
      target: { value: "14 polegadas" },
    });
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(screen.getByRole("list")).toHaveTextContent("Notebook");
    expect(screen.getByRole("list")).toHaveTextContent("14 polegadas");
    expect(screen.queryByText("Nenhum item cadastrado.")).not.toBeInTheDocument();
  });
});
