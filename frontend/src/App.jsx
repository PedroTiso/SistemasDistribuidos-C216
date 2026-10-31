function App() {
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

            <form className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="name">
                    Nome <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-slate-500">Até 100 caracteres</span>
                </div>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  id="name"
                  maxLength={100}
                  placeholder="Ex.: Notebook"
                  type="text"
                />
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
                  placeholder="Adicione uma breve descrição"
                  rows={4}
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
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-700">
                ☷
              </span>
              <h2 className="text-xl font-bold">Itens cadastrados</h2>
            </div>

            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">Nenhum item cadastrado.</p>
            </div>
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
