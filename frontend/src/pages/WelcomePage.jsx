import { Link } from "react-router-dom";
import ActionButton from "../components/common/ActionButton.jsx";

function WelcomePage() {
  return (
    <main className="min-h-screen bg-[#17211b] px-6 py-8 text-stone-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between">
        <header className="flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">LabFix</p>
          <span className="rounded-full border border-stone-600 px-4 py-2 text-xs text-stone-300">
            C216 · Sistemas Distribuídos
          </span>
        </header>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">
              Cuidado com o espaço de aprendizagem
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Seu laboratório precisa de atenção?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">
              Registre um chamado para que problemas em equipamentos e salas não atrapalhem a
              próxima aula.
            </p>
            <Link className="mt-8 inline-block" to="/chamados/novo">
              <ActionButton>
                Registrar um chamado <span className="ml-2">→</span>
              </ActionButton>
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-teal-300/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-stone-700 bg-[#223128] p-8 shadow-2xl">
              <div className="mb-12 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                  Painel de cuidado
                </span>
                <span className="h-3 w-3 rounded-full bg-teal-300 shadow-[0_0_18px] shadow-teal-300" />
              </div>
              <p className="text-7xl font-black text-amber-300">01</p>
              <p className="mt-4 text-xl font-semibold">chamado começa com um relato.</p>
              <div className="mt-10 h-px bg-stone-700" />
              <p className="mt-5 text-sm leading-6 text-stone-400">
                Ajude a equipe a encontrar o problema, o local e a prioridade certa.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-stone-700 pt-5 text-xs text-stone-500">
          LabFix · manutenção colaborativa dos laboratórios
        </footer>
      </div>
    </main>
  );
}

export default WelcomePage;
