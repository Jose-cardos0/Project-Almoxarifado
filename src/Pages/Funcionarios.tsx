import React, { FormEvent, useState } from "react";

//firebase
import { db, storage } from "../FireBase/FireBase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";

//toast
import { toast } from "react-toastify";

const Funcionarios = () => {
  const [ativo, setAtivo] = useState(true);
  const [imagem, setImagem] = useState<any>();

  //inputs
  const [nomeFunc, setNomeFunc] = useState<string>("");
  const [fileImg, setFileImg] = useState<File | any>();
  const [dataAdmisao, setDataAdmisao] = useState<string>("");
  const [cargoFunc, setCargo] = useState<string>();
  const [ativoFunc, setAtivoFunc] = useState<boolean | string>("ativo");
  const [inativoFunc, setInativoFunc] = useState<boolean | string>("inativo");
  const [contatoFunc, setContatoFunc] = useState<string>("");
  const [emailFunc, setEmailFunc] = useState<string>();
  const [sexoF, setSexoF] = useState<string>("Feminino");
  const [sexoM, setSexoM] = useState<string>("Masculino");
  const [demissao, setDemissao] = useState("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAtivo(value === "ativo");
    if (ativo === false) {
      setInativoFunc(true);
      setAtivoFunc(false);
    } else if (ativo === true) {
      setInativoFunc(false);
      setAtivoFunc(true);
    }
  };

  const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setImagem(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (event: FormEvent) => {
    event.preventDefault();
    setImagem(null);
  };

  async function handleFuncionarioSubmit(e: FormEvent) {
    e.preventDefault();
    setNomeFunc("");
    setFileImg("");
    setDataAdmisao("");
    setCargo("");
    setDemissao("");
    setContatoFunc("");
    setEmailFunc("");
    setImagem(null);

    try {
      const imagemRef = ref(storage, `imagens/${fileImg.nomeFunc}`);
      await uploadString(imagemRef, imagem, "data_url");

      await addDoc(collection(db, "Funcionario"), {
        nomeFunc: nomeFunc,
        cargoFunc: cargoFunc,
        imagem: imagemRef.fullPath,
        contatoFunc: contatoFunc,
        emailFunc: emailFunc,
        sexoF: sexoF,
        sexoM: sexoM,
        ativo: ativoFunc,
        inativo: inativoFunc,
        demissao: demissao,
      })
        .then(() => {
          toast.success("Funcionário registrado com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao registrar funcionário!");
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen w-screen overflow-hidden">
      <div className="flex flex-col h-auto w-3/6 m-auto items-center justify-center p-8 bg-blue-50 shadow-lg">
        <h1 className="font-bold border-solid border-b-2 mb-2">
          Painel de registro
        </h1>
        <div className="flex flex-col w-9/12">
          <form
            onSubmit={handleFuncionarioSubmit}
            className="flex flex-col w-full "
          >
            <div className="flex items-center justify-center gap-5">
              <label className="w-full">
                Nome:
                <input
                  className="border-solid border-b-2 outline-none w-full p-1"
                  type="text"
                  value={nomeFunc}
                  onChange={(e) =>
                    setNomeFunc(e.target.value.toLocaleUpperCase())
                  }
                  disabled={!ativo}
                  required
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
                  value={fileImg}
                  required
                  accept="image/png,image/jpeg"
                  className="bg-blue-700  p-2 rounded-sm mt-2 
                            font-light text-xs text-white hover:bg-green-700"
                  disabled={!ativo}
                  onChange={(e) => {
                    handleImagemChange(e);
                    setFileImg(e.target.value);
                  }}
                />
              </div>
            </div>
            <label className="w-full">
              Data de admissão:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="date"
                value={dataAdmisao}
                onChange={(e) => setDataAdmisao(e.target.value)}
                disabled={!ativo}
              />
            </label>
            <label className="w-full">
              Setor:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="text"
                required
                value={cargoFunc}
                onChange={(e) => setCargo(e.target.value.toLocaleUpperCase())}
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
                  value={demissao}
                  onChange={(e) => setDemissao(e.target.value)}
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
                required
                placeholder="(xx) x xxxx-xxxx"
                disabled={!ativo}
                value={contatoFunc}
                onChange={(e) =>
                  setContatoFunc(e.target.value.toLocaleUpperCase())
                }
              />
            </label>
            <label className="w-full">
              E-mail:
              <input
                className="border-solid border-b-2 outline-none w-full p-1"
                type="email"
                required
                disabled={!ativo}
                value={emailFunc}
                onChange={(e) =>
                  setEmailFunc(e.target.value.toLocaleUpperCase())
                }
              />
            </label>
            <label className="w-full">
              <p>Sexo:</p>
              <input
                className="border-solid border-b-2 outline-none"
                type="radio"
                id="sexo-m"
                name="sexo"
                value={sexoM}
                onChange={(e) => setSexoM(e.target.value)}
                disabled={!ativo}
              />{" "}
              <span className="mr-3">Masculino</span>
              <input
                className="border-solid border-b-2 outline-none"
                type="radio"
                id="sexo-f"
                name="sexo"
                value={sexoF}
                onChange={(e) => setSexoF(e.target.value)}
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
