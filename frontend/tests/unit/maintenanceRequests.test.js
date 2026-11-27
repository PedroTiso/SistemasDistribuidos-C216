import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createMaintenanceRequest,
  deleteMaintenanceRequest,
  listMaintenanceRequests,
  updateMaintenanceRequest,
} from "../../src/services/maintenanceRequests.js";

afterEach(() => vi.unstubAllGlobals());

describe("maintenance requests service", () => {
  it("lists requests from the API", async () => {
    const requests = [{ id: 1, title: "Teclado com defeito" }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(requests))));

    await expect(listMaintenanceRequests()).resolves.toEqual(requests);
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/maintenance-requests", undefined);
  });

  it("creates, updates and deletes a request through the API", async () => {
    const request = {
      title: "Teclado com defeito",
      description: "Teclas falhando",
      location: "Sala 1",
      priority: "high",
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1, ...request }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1, ...request }), { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(createMaintenanceRequest(request)).resolves.toMatchObject({ id: 1 });
    await expect(updateMaintenanceRequest(1, request)).resolves.toMatchObject({ id: 1 });
    await expect(deleteMaintenanceRequest(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
