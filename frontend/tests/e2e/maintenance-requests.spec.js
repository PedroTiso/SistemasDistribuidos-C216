import { expect, test } from "@playwright/test";

test("registra, edita e exclui um chamado", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /registrar um chamado/i }).click();
  await page.locator("#title").first().fill("Projetor sem imagem");
  await page.locator("#description").first().fill("O projetor liga, mas não exibe a imagem.");
  await page.locator("#location").first().fill("Sala 204");
  await page.getByRole("button", { name: /registrar chamado/i }).click();
  await expect(page.getByRole("list")).toContainText("Projetor sem imagem");

  await page
    .getByRole("listitem")
    .first()
    .getByRole("button", { name: /editar/i })
    .click();
  await page.getByRole("dialog").locator("#title").fill("Projetor ajustado");
  await page.getByRole("button", { name: /salvar alterações/i }).click();
  await expect(page.getByRole("list")).toContainText("Projetor ajustado");

  await page
    .getByRole("listitem")
    .first()
    .getByRole("button", { name: /excluir/i })
    .click();
  await expect(page.getByText("Nenhum chamado registrado ainda.")).toBeVisible();
});

test("impede o envio de dados apenas numéricos", async ({ page }) => {
  await page.goto("/chamados/novo");
  await page.locator("#title").first().fill("11111");
  await page.locator("#description").first().fill("1234567890");
  await page.locator("#location").first().fill("123");

  await expect(page.getByRole("button", { name: /registrar chamado/i })).toBeDisabled();
});
