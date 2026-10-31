import { expect, test } from "@playwright/test";

test("cadastra um item e exibe na listagem", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(/Nome/).fill("Notebook");
  await page.getByLabel(/Descrição/).fill("14 polegadas");
  await page.getByRole("button", { name: /Adicionar/ }).click();

  await expect(page.getByRole("list")).toContainText("Notebook");
  await expect(page.getByRole("list")).toContainText("14 polegadas");
  await expect(page.getByText("Nenhum item cadastrado.")).toBeHidden();
});

test("exibe validação quando o nome está vazio", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /Adicionar/ }).click();

  await expect(page.getByRole("alert")).toHaveText("O nome é obrigatório.");
});
