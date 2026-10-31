import { describe, expect, it } from "vitest";
import { MAX_NAME_LENGTH, validateItem } from "../../src/validation";

describe("validateItem", () => {
  it("rejects an empty name", () => {
    const result = validateItem("   ", "Descrição");

    expect(result.errors.name).toBe("O nome é obrigatório.");
  });

  it("rejects a name longer than the maximum length", () => {
    const result = validateItem("a".repeat(MAX_NAME_LENGTH + 1), "");

    expect(result.errors.name).toContain("100 caracteres");
  });

  it("trims valid values and keeps the description optional", () => {
    const result = validateItem(" Notebook ", " Material ");

    expect(result.errors).toEqual({});
    expect(result.values).toEqual({ name: "Notebook", description: "Material" });
  });
});
