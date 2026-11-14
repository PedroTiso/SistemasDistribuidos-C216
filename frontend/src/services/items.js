const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const ITEMS_URL = `${API_URL}/items`;

async function request(url, options, errorMessage) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error("Não foi possível conectar à API.");
  }

  if (!response.ok) {
    let detail = errorMessage;

    try {
      const data = await response.json();
      if (data.detail) {
        detail = data.detail;
      }
    } catch {
      // Mantém a mensagem padrão quando a API não retorna JSON.
    }

    throw new Error(detail);
  }

  return response.json();
}

export function listItems() {
  return request(ITEMS_URL, undefined, "Erro ao carregar os itens.");
}

export function createItem(name, description) {
  return request(
    ITEMS_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: description || null }),
    },
    "Erro ao cadastrar o item.",
  );
}
