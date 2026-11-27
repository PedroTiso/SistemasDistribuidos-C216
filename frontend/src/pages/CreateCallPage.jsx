import { Link } from "react-router-dom";
import ActionButton from "../components/common/ActionButton.jsx";

function CreateCallPage() {
  return (
    <main className="min-h-screen bg-[#17211b] px-4 py-8 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-amber-300">
              LabFix
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Registrar chamado</h1>
            <p className="mt-2 text-base text-stone-300">
              Conte o que aconteceu para ajudarmos a manter o laboratório funcionando.
            </p>
          </div>
          <Link to="/">
            <ActionButton variant="outline">Voltar à entrada</ActionButton>
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="rounded-[1.5rem] border border-stone-700 bg-[#223128] p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-stone-600 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300 text-2xl text-[#17211b]">
                +
              </span>
              <h2 className="text-xl font-bold">Detalhes do problema</h2>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="title">
                  Título <span className="text-amber-300">*</span>
                </label>
                <input
                  className="w-full rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
                  id="title"
                  maxLength={100}
                  placeholder="Ex.: Projetor da sala 204 com falha"
                  type="text"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="description">
                  Descrição <span className="text-amber-300">*</span>
                </label>
                <textarea
                  className="min-h-32 w-full resize-y rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
                  id="description"
                  placeholder="Descreva o problema encontrado"
                  rows={4}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="location">
                  Local <span className="text-amber-300">*</span>
                </label>
                <input
                  className="w-full rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
                  id="location"
                  placeholder="Ex.: Laboratório 1"
                  type="text"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold" htmlFor="priority">
                  Prioridade <span className="text-amber-300">*</span>
                </label>
                <select
                  className="w-full rounded-xl border border-stone-600 bg-[#17211b] px-4 py-3 text-sm text-stone-100 outline-none focus:border-teal-300 focus:ring-4 focus:ring-teal-300/20"
                  defaultValue="medium"
                  id="priority"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>

              <ActionButton type="submit" variant="primary">
                Registrar chamado
              </ActionButton>
            </form>
          </section>

          <section className="rounded-[1.5rem] border border-stone-700 bg-[#223128] p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-stone-600 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-300 text-xl text-[#17211b]">
                ☷
              </span>
              <h2 className="text-xl font-bold">Chamados registrados</h2>
            </div>
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-stone-600 p-6 text-center">
              <p className="text-sm text-stone-400">Nenhum chamado registrado ainda.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default CreateCallPage;
