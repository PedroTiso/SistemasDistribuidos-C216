export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_LOCATION_LENGTH = 100;

function containsLetter(value) {
  return /\p{L}/u.test(value);
}

export function validateMaintenanceRequest(title, description, location, priority) {
  const errors = {};
  const values = {
    title: title.trim(),
    description: description.trim(),
    location: location.trim(),
    priority,
  };

  if (values.title.length < 3) {
    errors.title = "O título deve ter pelo menos 3 caracteres.";
  } else if (!containsLetter(values.title)) {
    errors.title = "O título deve conter pelo menos uma letra.";
  } else if (values.title.length > MAX_TITLE_LENGTH) {
    errors.title = `O título deve ter no máximo ${MAX_TITLE_LENGTH} caracteres.`;
  }

  if (values.description.length < 10) {
    errors.description = "A descrição deve ter pelo menos 10 caracteres.";
  } else if (!containsLetter(values.description)) {
    errors.description = "A descrição deve conter pelo menos uma letra.";
  } else if (values.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `A descrição deve ter no máximo ${MAX_DESCRIPTION_LENGTH} caracteres.`;
  }

  if (values.location.length < 2) {
    errors.location = "Informe o local do problema.";
  } else if (!containsLetter(values.location)) {
    errors.location = "O local deve conter pelo menos uma letra.";
  } else if (values.location.length > MAX_LOCATION_LENGTH) {
    errors.location = `O local deve ter no máximo ${MAX_LOCATION_LENGTH} caracteres.`;
  }

  if (!["low", "medium", "high"].includes(values.priority)) {
    errors.priority = "Selecione uma prioridade válida.";
  }

  return { errors, values };
}
