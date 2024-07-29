const Funcionarios = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-col h-3/6 w-3/6 m-auto items-center justify-center  bg-blue-50">
        <h1>Painel de registro</h1>
        <div className="flex flex-col w-9/12">
          <form className="flex flex-col w-full ">
            <div className="flex items-center justify-center gap-5">
              <label className="w-full">
                Nome:
                <input
                  className="border-solid border-b-2 outline-none w-full"
                  type="text"
                />
              </label>
              <div>
                <p className="border-solid border-2 h-20">foto</p>
                <button
                  className="bg-blue-700  p-2 rounded-sm mt-2
                            font-light text-xs text-white hover:bg-green-700"
                >
                  Adicionar foto
                </button>
              </div>
            </div>
            <label className="w-full">
              Data de admissão:
              <input
                className="border-solid border-b-2 outline-none w-full"
                type="date"
              />
            </label>
            <label className="w-full">
              <input
                className="border-solid border-b-2 outline-none"
                type="radio"
                value="inativo"
              />{" "}
              <span className="mr-3">Inativo</span>
            </label>
            <label className="w-full">
              Contato:
              <input
                className="border-solid border-b-2 outline-none w-full"
                type="email"
                placeholder="(xx) x xxxx-xxxx"
              />
            </label>
            <label className="w-full">
              E-mail:
              <input
                className="border-solid border-b-2 outline-none w-full"
                type="email"
              />
            </label>
            <label className="w-full">
              <p>Sexo:</p>
              <input
                className="border-solid border-b-2 outline-none"
                type="radio"
                id="sexo-m"
                name="sexo"
                value="Masculino"
              />{" "}
              <span className="mr-3">Masculino</span>
              <input
                className="border-solid border-b-2 outline-none"
                type="radio"
                id="sexo-f"
                name="sexo"
                value="feminino"
              />{" "}
              <span>Feminino</span>
            </label>
            <button
              type="submit"
              className="bg-blue-700  p-2 rounded-sm mt-2
                            font-light text-xs text-white hover:bg-green-700"
            >
              Cadastrar | +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Funcionarios;
