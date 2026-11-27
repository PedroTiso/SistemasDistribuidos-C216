import { useState } from "react";
import { validateMaintenanceRequest } from "../validation.js";
import ActionButton from "./common/ActionButton.jsx";

function MaintenanceRequestForm({ initialRequest = null, onAdd, onCancel, onUpdate }) {
  const [title, setTitle] = useState(initialRequest?.title ?? "");
  const [description, setDescription] = useState(initialRequest?.description ?? "");
  const [location, setLocation] = useState(initialRequest?.location ?? "");
  const [priority, setPriority] = useState(initialRequest?.priority ?? "medium");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const result = validateMaintenanceRequest(title, description, location, priority);
    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) {
      return;
    }

    if (initialRequest) {
      onUpdate({ ...initialRequest, ...result.values });
    } else {
      onAdd({ ...result.values, status: "open" });
    }

    onCancel?.();
    setTitle("");
    setDescription("");
    setLocation("");
    setPriority("medium");
    setErrors({});
  }

  const validation = validateMaintenanceRequest(title, description, location, priority);
  const isFormComplete = Object.keys(validation.errors).length === 0;

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="title">
          Título <span className="text-amber-300">*</span>
        </label>
        <input
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={Boolean(errors.title)}
          className="w-full rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
          id="title"
          maxLength={100}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex.: Projetor da sala 204 com falha"
          type="text"
          value={title}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-amber-300" id="title-error">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="description">
          Descrição <span className="text-amber-300">*</span>
        </label>
        <textarea
          aria-describedby={errors.description ? "description-error" : undefined}
          aria-invalid={Boolean(errors.description)}
          className="min-h-32 w-full resize-y rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
          id="description"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descreva o problema encontrado"
          rows={4}
          value={description}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-amber-300" id="description-error">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="location">
          Local <span className="text-amber-300">*</span>
        </label>
        <input
          aria-describedby={errors.location ? "location-error" : undefined}
          aria-invalid={Boolean(errors.location)}
          className="w-full rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
          id="location"
          maxLength={100}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Ex.: Laboratório 1"
          type="text"
          value={location}
        />
        {errors.location && (
          <p className="mt-2 text-sm text-amber-300" id="location-error">
            {errors.location}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="priority">
          Prioridade <span className="text-amber-300">*</span>
        </label>
        <select
          className="w-full rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
          id="priority"
          onChange={(event) => setPriority(event.target.value)}
          value={priority}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3">
        <ActionButton disabled={!isFormComplete} type="submit" variant="primary">
          {initialRequest ? "Salvar alterações" : "Registrar chamado"}
        </ActionButton>
        {initialRequest && (
          <ActionButton onClick={onCancel} type="button" variant="outline">
            Cancelar
          </ActionButton>
        )}
      </div>
    </form>
  );
}

export default MaintenanceRequestForm;
