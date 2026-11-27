import { useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../components/common/ActionButton.jsx";
import MaintenanceRequestForm from "../components/MaintenanceRequestForm.jsx";
import MaintenanceRequestList from "../components/MaintenanceRequestList.jsx";

function CreateCallPage() {
  const [requests, setRequests] = useState([]);

  function handleAddRequest(request) {
    setRequests((currentRequests) => [...currentRequests, { ...request, id: crypto.randomUUID() }]);
  }

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
            <MaintenanceRequestForm onAdd={handleAddRequest} />
          </section>

          <section className="rounded-[1.5rem] border border-stone-700 bg-[#223128] p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-stone-600 pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-300 text-xl text-[#17211b]">
                ☷
              </span>
              <h2 className="text-xl font-bold">Chamados registrados</h2>
            </div>
            <MaintenanceRequestList requests={requests} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default CreateCallPage;
