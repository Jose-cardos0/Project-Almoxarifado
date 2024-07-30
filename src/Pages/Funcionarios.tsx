import React, { FormEvent, useState } from "react";

const Funcionarios = () => {
  const [ativo, setAtivo] = useState(true);
  const [imagem, setImagem] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAtivo(value === "ativo");
  };

  const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagem(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (event: FormEvent) => {
    event.preventDefault();
    setImagem(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-col h-auto w-3/6 m-auto items-center justify-center p-8 bg-blue-50">
        <h1 className="font-bold border-solid border-b-2 mb-2">
          Painel de registro
        </h1>
        <div className="flex flex-col w-9/12">
          <form className="flex flex-col w-full ">
            <div className="flex items-center justify-center gap-5">
              <label className="w-full">
                Nome:
                <input
                  className="border-solid border-b-2 outline-none w-full p-1"
                  type="text"
                  disabled={!ativo}
                />
              </label>
              <div>
                <p
                  className={
                    imagem
                      ? ` h-40 flex items-center justify-center relative z-90`
                      : `border-solid border-2 h-40 flex items-center justify-center relative z-90`
                  }
                >
                  {imagem ? (
                    <img
                      src={imagem}
                      alt="Imagem"
                      className="h-40 w-30 bg-cover"
                    />
                  ) : (
                    "Anexe sua foto"
                  )}
                  {imagem && (
                    <button
                      onClick={(event) => handleRemove(event)}
                      className="text-white absolute z-99 top-0 right-2 px-2 bg-red-700  hover:bg-red-300 "
                    >
                      X
                    </button>
                  )}
                </p>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="bg-blue-700  p-2 rounded-sm mt-2 
                            font-light text-xs text-white hover:bg-green-700"
                  disabled={!ativo}
                  onChange={handleImagemChange}
                />
              </div>
            </div>
            <label className="w-full">
              Data de admissão:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="date"
                disabled={!ativo}
              />
            </label>
            <label className="w-full">
              Setor:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="text"
                disabled={!ativo}
              />
            </label>
            <label className="w-full">
              <input
                onChange={handleRadioChange}
                className="border-solid border-b-2 outline-none"
                type="radio"
                value="ativo"
                checked={ativo}
              />{" "}
              <span className="mr-3">Ativo</span>
            </label>
            <label className="w-full">
              <input
                onChange={handleRadioChange}
                className="border-solid border-b-2 outline-none"
                type="radio"
                value="inativo"
                checked={!ativo}
              />{" "}
              <span className="mr-3">Inativo</span>
            </label>
            {!ativo ? (
              <label className="w-full">
                Data de demissão:
                <input
                  className="border-solid border-b-2 outline-none w-full p-1"
                  type="date"
                  disabled={ativo}
                />
              </label>
            ) : (
              ""
            )}

            <label className="w-full">
              Contato:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="text"
                placeholder="(xx) x xxxx-xxxx"
                disabled={!ativo}
              />
            </label>
            <label className="w-full">
              E-mail:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="email"
                disabled={!ativo}
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
                disabled={!ativo}
              />{" "}
              <span className="mr-3">Masculino</span>
              <input
                className="border-solid border-b-2 outline-none"
                type="radio"
                id="sexo-f"
                name="sexo"
                value="feminino"
                disabled={!ativo}
              />{" "}
              <span>Feminino</span>
            </label>
            <button
              type="submit"
              className="bg-blue-700  p-2 rounded-sm mt-2
                            font-light text-xs text-white hover:bg-green-700"
              disabled={!ativo}
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
