import { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((currentItems) => [...currentItems, { ...item, id: crypto.randomUUID() }]);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Sistemas Distribuídos · C216
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Gerenciador de Itens</h1>
          <p className="mt-2 text-base text-slate-600">
            Cadastre e consulte seus itens de forma simples.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-700">
                +
              </span>
              <h2 className="text-xl font-bold">Novo item</h2>
            </div>

            <ItemForm onAdd={handleAddItem} />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-700">
                ☷
              </span>
              <h2 className="text-xl font-bold">Itens cadastrados</h2>
            </div>

            <ItemList items={items} />
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Os dados são temporários e serão apagados ao atualizar a página.
        </p>
      </div>
    </main>
  );
}

export default App;
