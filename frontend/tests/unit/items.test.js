import { afterEach, describe, expect, it, vi } from "vitest";
import { createItem, listItems } from "../../src/services/items";

afterEach(() => vi.unstubAllGlobals());

describe("items service", () => {
  it("lists items from the API", async () => {
    const items = [{ id: 1, name: "Notebook", description: null }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(items))));
    await expect(listItems()).resolves.toEqual(items);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/items", undefined);
  });

  it("creates an item through the API", async () => {
    const createdItem = { id: 1, name: "Notebook", description: "14 polegadas" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(createdItem))));
    await expect(createItem("Notebook", "14 polegadas")).resolves.toEqual(createdItem);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/items",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
