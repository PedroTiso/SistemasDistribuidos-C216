import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../../src/App.jsx";

function fillRequestForm() {
  fireEvent.change(screen.getByLabelText(/título/i), { target: { value: "Projetor sem imagem" } });
  fireEvent.change(screen.getByLabelText(/descrição/i), {
    target: { value: "O projetor liga, mas não exibe a imagem." },
  });
  fireEvent.change(screen.getByLabelText(/local/i), { target: { value: "Sala 204" } });
}

describe("LabFix request flow", () => {
  it("navigates to the form and registers a maintenance request", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /registrar um chamado/i }));
    fillRequestForm();
    fireEvent.click(screen.getByRole("button", { name: /registrar chamado/i }));

    expect(screen.getByRole("list")).toHaveTextContent("Projetor sem imagem");
    expect(screen.getByRole("list")).toHaveTextContent("Sala 204");
  });

  it("edits and removes a registered request locally", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /registrar um chamado/i }));
    fillRequestForm();
    fireEvent.click(screen.getByRole("button", { name: /registrar chamado/i }));

    fireEvent.click(screen.getByRole("button", { name: /editar/i }));
    fireEvent.change(screen.getByRole("dialog").querySelector('input[type="text"]'), {
      target: { value: "Projetor ajustado" },
    });
    fireEvent.click(screen.getByRole("button", { name: /salvar alterações/i }));
    expect(screen.getByRole("list")).toHaveTextContent("Projetor ajustado");

    fireEvent.click(screen.getByRole("button", { name: /excluir/i }));
    expect(screen.getByText("Nenhum chamado registrado ainda.")).toBeInTheDocument();
  });
});
