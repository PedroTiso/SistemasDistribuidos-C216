import { describe, expect, it } from "vitest";
import { validateMaintenanceRequest } from "../../src/validation.js";

describe("validateMaintenanceRequest", () => {
  it("rejects values made only of numbers", () => {
    const result = validateMaintenanceRequest("11111", "1234567890", "123", "medium");

    expect(result.errors).toEqual({
      title: "O título deve conter pelo menos uma letra.",
      description: "A descrição deve conter pelo menos uma letra.",
      location: "O local deve conter pelo menos uma letra.",
    });
  });

  it("accepts a complete maintenance request", () => {
    const result = validateMaintenanceRequest(
      "Teclado com defeito",
      "Algumas teclas não respondem.",
      "Laboratório 1",
      "high",
    );

    expect(result.errors).toEqual({});
    expect(result.values.priority).toBe("high");
  });
});
