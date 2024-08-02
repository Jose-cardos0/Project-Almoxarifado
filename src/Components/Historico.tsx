export function Historico() {
  return (
    <div className="bg-white h-full p-3">
      <div className="flex p-1 gap-1 justify-between max-w-full border-solid border-b-2 border-green-400">
        <div className="flex gap-1">
          <p>Nome do item:</p>
          <p className="text-red-700 font-semibold italic">Resp</p>
        </div>
        <div className="flex gap-1">
          <p>Data da saída:</p>
          <p className="text-red-700 font-semibold italic">Resp</p>
        </div>
        <div className="flex gap-1">
          <p>Quantidade:</p>
          <p className="text-red-700 font-semibold italic">Resp</p>
        </div>
        <div>
          <p>🟢</p>
        </div>
      </div>
    </div>
  );
}
