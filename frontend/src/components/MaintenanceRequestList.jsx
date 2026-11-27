import ActionButton from "./common/ActionButton.jsx";

function MaintenanceRequestList({ onDelete, onEdit, requests }) {
  if (requests.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-stone-600 p-6 text-center">
        <p className="text-sm text-stone-400">Nenhum chamado registrado ainda.</p>
      </div>
    );
  }

  return (
    <ul aria-label="Chamados registrados" className="space-y-4">
      {requests.map((request) => (
        <li
          className="rounded-2xl border border-stone-600 bg-[#18261e] p-5 shadow-sm"
          key={request.id}
        >
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="break-words text-base font-bold text-stone-100">{request.title}</p>
              <p className="mt-2 break-words text-sm leading-6 text-stone-300">
                {request.description}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17211b]">
              {request.priority}
            </span>
          </div>
          <p className="mt-4 border-t border-stone-700 pt-3 text-xs font-semibold uppercase tracking-wider text-teal-300">
            {request.location} · {request.status}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ActionButton onClick={() => onEdit(request)} variant="dark">
              Editar
            </ActionButton>
            <ActionButton onClick={() => onDelete(request.id)} variant="danger">
              Excluir
            </ActionButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MaintenanceRequestList;
