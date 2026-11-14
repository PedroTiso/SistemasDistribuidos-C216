import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../src/App";

describe("item manager", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((_url, options) => {
        if (options?.method === "POST") {
          return Promise.resolve(
            new Response(JSON.stringify({ id: 1, name: "Notebook", description: "14 polegadas" }), {
              status: 201,
              headers: { "Content-Type": "application/json" },
            }),
          );
        }
        return Promise.resolve(new Response("[]", { status: 200 }));
      }),
    );
  });

  it("loads and adds a new item through the API", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Nenhum item cadastrado.")).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/Nome/), { target: { value: "Notebook" } });
    fireEvent.change(screen.getByLabelText(/Descrição/), { target: { value: "14 polegadas" } });
    fireEvent.click(screen.getByRole("button", { name: /Adicionar/ }));

    await waitFor(() => {
      expect(screen.getByRole("list")).toHaveTextContent("Notebook");
      expect(screen.getByRole("list")).toHaveTextContent("14 polegadas");
    });
  });
});
