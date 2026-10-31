import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ItemList from "../../src/components/ItemList";

describe("ItemList", () => {
  it("shows the empty state when there are no items", () => {
    render(<ItemList items={[]} />);

    expect(screen.getByText("Nenhum item cadastrado.")).toBeInTheDocument();
  });

  it("shows the item name and description", () => {
    render(<ItemList items={[{ id: "1", name: "Notebook", description: "Material" }]} />);

    expect(screen.getByText("Notebook")).toBeInTheDocument();
    expect(screen.getByText("Material")).toBeInTheDocument();
  });
});
