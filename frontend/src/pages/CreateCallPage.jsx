import { useState } from "react";
import { Link } from "react-router-dom";
import ActionButton from "../components/common/ActionButton.jsx";
import MaintenanceRequestForm from "../components/MaintenanceRequestForm.jsx";
import MaintenanceRequestList from "../components/MaintenanceRequestList.jsx";

function CreateCallPage() {
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleAddRequest = (request) => {
    setRequests((currentRequests) => [...currentRequests, { ...request, id: crypto.randomUUID() }]);
  };

  const handleUpdateRequest = (updatedRequest) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request,
      ),
    );
  };

  const handleDeleteRequest = (requestId) => {
    setRequests((currentRequests) => currentRequests.filter((request) => request.id !== requestId));
    if (editingRequest?.id === requestId) {
      setEditingRequest(null);
    }
  };

  const cancelRequest = () => {
    setEditingRequest(null);
  };

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
            <MaintenanceRequestList
              onDelete={handleDeleteRequest}
              onEdit={setEditingRequest}
              requests={requests}
            />
          </section>
        </div>
      </div>
      {editingRequest && (
        <div
          aria-labelledby="edit-request-title"
          aria-modal="true"
          className="fixed inset-0 z-10 overflow-y-auto bg-[#0b120e]/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
        >
          <div className="mx-auto max-w-2xl rounded-[1.5rem] border border-stone-600 bg-[#223128] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-stone-600 pb-5">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
                  LabFix
                </p>
                <h2 className="text-2xl font-black" id="edit-request-title">
                  Editar chamado
                </h2>
              </div>
              <button
                aria-label="Fechar edição"
                className="rounded-full px-3 py-1 text-2xl text-stone-300 hover:bg-stone-700 hover:text-white"
                onClick={cancelRequest}
                type="button"
              >
                ×
              </button>
            </div>
            <MaintenanceRequestForm
              key={editingRequest.id}
              initialRequest={editingRequest}
              onCancel={cancelRequest}
              onUpdate={handleUpdateRequest}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default CreateCallPage;
