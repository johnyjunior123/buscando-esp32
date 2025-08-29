export default function Home() {
  return (
    <main className="flex-1 bg-black text-white p-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Plataforma Analítica</h1>
        <p className="text-gray-400 text-lg mb-8">
          Explore os dados de ocupação, comportamento e mapas de calor em tempo real.
        </p>
        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition duration-300">
          Entrar em contato
        </button>
      </div>
    </main>
  );
}
