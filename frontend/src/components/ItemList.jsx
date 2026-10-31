function ItemList({ items }) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-500">Nenhum item cadastrado.</p>
      </div>
    );
  }

  return (
    <ul aria-label="Itens cadastrados" className="space-y-3">
      {items.map((item) => (
        <li className="rounded-xl border border-blue-100 bg-blue-50 p-4" key={item.id}>
          <p className="font-semibold text-slate-900">{item.name}</p>
          {item.description && <p className="mt-1 text-sm text-slate-600">{item.description}</p>}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
