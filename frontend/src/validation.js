export const MAX_NAME_LENGTH = 100;

export function validateItem(name, description) {
  const errors = {};
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    errors.name = "O nome é obrigatório.";
  } else if (trimmedName.length > MAX_NAME_LENGTH) {
    errors.name = `O nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres.`;
  }

  return {
    errors,
    values: {
      name: trimmedName,
      description: description.trim(),
    },
  };
}
