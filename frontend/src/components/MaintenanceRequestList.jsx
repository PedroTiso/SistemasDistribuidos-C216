function MaintenanceRequestList({ requests }) {
  if (requests.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-stone-600 p-6 text-center">
        <p className="text-sm text-stone-400">Nenhum chamado registrado ainda.</p>
      </div>
    );
  }

  return (
    <ul aria-label="Chamados registrados" className="space-y-3">
      {requests.map((request) => (
        <li className="rounded-xl border border-teal-800 bg-[#17211b] p-4" key={request.id}>
          <div className="flex items-start justify-between gap-4">
            <p className="font-semibold text-stone-100">{request.title}</p>
            <span className="rounded-full bg-amber-300 px-2 py-1 text-xs font-bold text-[#17211b]">
              {request.priority}
            </span>
          </div>
          <p className="mt-1 text-sm text-stone-400">{request.description}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-300">
            {request.location} · {request.status}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default MaintenanceRequestList;
