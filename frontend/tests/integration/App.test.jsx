import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../src/App.jsx";

describe("LabFix API integration", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    vi.stubGlobal(
      "fetch",
      vi.fn((_url, options) => {
        if (options?.method === "POST") {
          return Promise.resolve(
            new Response(
              JSON.stringify({
                id: 1,
                title: "Projetor sem imagem",
                description: "O projetor não exibe a imagem.",
                location: "Sala 204",
                priority: "medium",
                status: "open",
              }),
              { status: 201 },
            ),
          );
        }

        return Promise.resolve(new Response("[]", { status: 200 }));
      }),
    );
  });

  it("loads and creates a request through the API", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("link", { name: /registrar um chamado/i }));
    await waitFor(() =>
      expect(screen.getByText("Nenhum chamado registrado ainda.")).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Projetor sem imagem" },
    });
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: "O projetor não exibe a imagem." },
    });
    fireEvent.change(screen.getByLabelText(/local/i), { target: { value: "Sala 204" } });
    fireEvent.click(screen.getByRole("button", { name: /registrar chamado/i }));

    await waitFor(() => expect(screen.getByRole("list")).toHaveTextContent("Projetor sem imagem"));
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/maintenance-requests",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
