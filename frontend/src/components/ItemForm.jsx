import { useState } from "react";
import { validateItem } from "../validation";

function ItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const result = validateItem(name, description);
    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) {
      return;
    }

    onAdd(result.values);
    setName("");
    setDescription("");
    setErrors({});
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label className="text-sm font-semibold text-slate-800" htmlFor="name">
            Nome <span className="text-red-600">*</span>
          </label>
          <span className="text-xs text-slate-500">Até 100 caracteres</span>
        </div>
        <input
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={Boolean(errors.name)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          id="name"
          maxLength={100}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex.: Notebook"
          type="text"
          value={name}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-700" id="name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label className="text-sm font-semibold text-slate-800" htmlFor="description">
            Descrição
          </label>
          <span className="text-xs text-slate-500">Opcional</span>
        </div>
        <textarea
          className="min-h-32 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          id="description"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Adicione uma breve descrição"
          rows={4}
          value={description}
        />
      </div>

      <button
        className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
        type="submit"
      >
        <span aria-hidden="true" className="mr-2 text-lg">
          +
        </span>
        Adicionar
      </button>
    </form>
  );
}

export default ItemForm;
