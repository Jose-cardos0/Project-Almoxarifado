import { FormEvent, useState, useRef, useEffect } from "react";

//firebase
import { db } from "../FireBase/FireBase";

import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

//toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [nome, setNome] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [quantidade, setQuantidade] = useState<number>();
  const redAtention = useRef<HTMLInputElement>(null);
  const [interval, setInterval] = useState(false);
  const [dataId, setDataId] = useState<string>("");
  const [saida, setSaida] = useState<boolean>(false);
  const [saidaQuantidade, setSaidaQuant] = useState<number>();
  const [saidaEntregue, setSaidaEntregue] = useState("");
  const [saidaSetor, setSaidaSetor] = useState<string>("");
  const [saidaLiberadoPor, setSaidaLiberadoPor] = useState<string>("");
  const [codigoPedido, setCodigoPedido] = useState<string | number>();
  const [idItem, setIdItem] = useState<string>("");
  const [quantItem, setQuantItem] = useState<number>();

  const [data, setData] = useState<ProdutosProps[]>([]);

  interface ProdutosProps {
    id: string;
    nome: string;
    desc: string;
    quantidade: number;
  }

  async function getData() {
    const linksRef = collection(db, "produtos");
    const queryRef = query(linksRef);

    await getDocs(queryRef).then((snapshot) => {
      let lista = [] as ProdutosProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          nome: doc.data().nome,
          desc: doc.data().desc,
          quantidade: doc.data().quantidade,
        });
      });

      setData(lista);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  async function handlesubmit(e: FormEvent) {
    e.preventDefault();

    if (!nome || !desc || quantidade == 0) {
      toast.warning("Necessário preencher os campos");
      setInterval(true);
      redAtention.current?.focus();
      return;
    } else {
      setInterval(false);
    }

    if (dataId === "") {
      await addDoc(collection(db, "produtos"), {
        nome: nome,
        desc: desc,
        quantidade: quantidade,
      }).then(() => {
        getData();
        setNome("");
        setDesc("");
        setQuantidade(0);
      });
    } else {
      await updateDoc(doc(db, "produtos", dataId), {
        nome: nome,
        desc: desc,
        quantidade: quantidade,
      })
        .then(() => {
          toast.success(`${nome}, atualizado!`);
          console.log(dataId);
        })
        .catch((error) => {
          console.log(error.message);
        });

      getData();
      setNome("");
      setDesc("");
      setQuantidade(0);
      setDataId("");
    }
  }

  function handleEdit(item: ProdutosProps) {
    setNome(item.nome);
    setDesc(item.desc);
    setQuantidade(item.quantidade);
    const id = item.id;
    setDataId(id);
    console.log(item.id);
  }

  // async function handleSavedEdit() {
  //   await updateDoc(doc(db, "produtos", dataId), {
  //     nome: nome,
  //     desc: desc,
  //     quantidade: quantidade,
  //   })
  //     .then(() => {
  //       alert("sucesso");
  //       console.log(dataId);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });

  //   setNome("");
  //   setDesc("");
  //   setQuantidade(0);
  //   setDataId(""); // reset dataId
  // }

  function handleExit(item: ProdutosProps) {
    setSaida(true);
    setNome(item.nome);
    setIdItem(item.id);
    setQuantItem(item.quantidade);
  }

  async function handleDelete(item: string) {
    await deleteDoc(doc(db, "produtos", item));
    getData();
  }

  async function handleSubmitSaida(e: FormEvent) {
    e.preventDefault();

    const quantiSelecionada = quantItem;

    const novaQuantidade = Number(quantiSelecionada) - Number(saidaQuantidade);

    if (novaQuantidade < 0) {
      toast.error("Quantidade insuficiente");
      return;
    }

    try {
      await updateDoc(doc(db, "produtos", idItem), {
        quantidade: novaQuantidade,
      });
      toast.success("Sucesso");
      setSaida(false);
      getData();
    } catch (error) {
      toast.error("Erro ao atualizar quantidade");
      console.error(error);
    }
  }

  return (
    <div className="flex w-full flex-col relative">
      <div className="flex flex-col w-full m-auto items-center mb-10">
        <h1>Entrada de Produtos</h1>
        <form onSubmit={handlesubmit} className=" flex gap-5 ">
          <span className="mr-1">Nome do produto:</span>
          <input
            className={`border-solid border-b-2 outline-none ${
              interval ? "invalido" : ""
            }`}
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            ref={redAtention}
          />
          <span className="mr-1">Descrição:</span>
          <input
            className={`border-solid border-b-2 outline-none ${
              interval ? "invalido" : ""
            }`}
            placeholder="Digite a descrição do produto"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            ref={redAtention}
          />
          <span className="mr-1">Quantidade:</span>
          <input
            className={`border-solid border-b-2 outline-none ${
              interval ? "invalido" : ""
            }`}
            type="number"
            placeholder="ex: 150"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            ref={redAtention}
          />
          {dataId?.length > 0 ? (
            <button
              type="submit"
              className="bg-blue-700 p-2 rounded-sm 
                font-light text-xs text-white hover:bg-green-500"
            >
              Atualizar ✅
            </button>
          ) : (
            <button
              className="bg-blue-700 p-2 rounded-sm 
              font-light text-xs text-white hover:bg-green-500"
              type="submit"
            >
              Cadastrar | +
            </button>
          )}
        </form>
      </div>
      <div className="flex flex-col w-9/12 justify-center items-center m-auto">
        <div className="mb-3">
          <span className="mr-3">Procurar item:</span>
          <input type="text" placeholder="Digite o item procurado" />
          <button>🔍</button>
        </div>
        <div className="w-full shadow-lg">
          <table className="w-full table-auto">
            <tr className="bg-gray-400">
              <th className="w-2/6">Produto</th>
              <th className="w-2/6">Descrição</th>
              <th className="text-end">Quantidade</th>
            </tr>
            {data.map((item) => (
              <tr key={item.id} className="border-solid border-y-2">
                <td className="text-center">{item.nome}</td>
                <td className="text-center">{item.desc}</td>
                <td className="text-center">
                  <div className="flex justify-end gap-2">
                    <p>
                      <span className="border-solid border-2 rounded-md px-3 ">
                        {item.quantidade}
                      </span>
                    </p>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-700 px-3 rounded-sm 
                            font-light text-xs text-white hover:bg-orange-400"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-blue-700  px-3 rounded-sm 
                            font-light text-xs text-white hover:bg-red-500"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => handleExit(item)}
                      className="bg-blue-700  px-3 rounded-sm 
                            font-light text-xs text-white hover:bg-green-700"
                    >
                      📦
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
          {/*SECTION PROMPT*/}
          <section
            className={`${
              saida === true ? "" : "hidden"
            } flex flex-col justify-center items-center  rounded-lg fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-60`}
          >
            <div className="flex flex-col bg-blue-50 p-10 w-1/3">
              <div className="flex items-center justify-between">
                <p className="text-center font-bold">Painel de Saída</p>
                <button
                  onClick={() => {
                    setSaida(false);
                  }}
                  className="bg-red-700  px-3 rounded-sm items-end 
                font-light text-xs text-white hover:bg-red-300"
                >
                  <p className="font-bold">X</p>
                </button>
              </div>

              <form onSubmit={handleSubmitSaida} className="flex flex-col">
                <label className="flex flex-col mt-2">
                  Quantidade:
                  <input
                    className="border-solid border-b-2 outline-none"
                    type="number"
                    placeholder="Quantidade entregue..."
                    value={saidaQuantidade}
                    onChange={(e) => setSaidaQuant(Number(e.target.value))}
                  />
                </label>

                <label className="flex flex-col mt-2">
                  Entregue a:
                  <input
                    className="border-solid border-b-2 outline-none"
                    type="text"
                    placeholder="Nome do funcionário."
                    value={saidaEntregue}
                    onChange={(e) => setSaidaEntregue(e.target.value)}
                  />
                  <input
                    className="border-solid border-b-2 outline-none"
                    type="text"
                    placeholder="Setor"
                    value={saidaSetor}
                    onChange={(e) => setSaidaSetor(e.target.value)}
                  />
                </label>

                <label className="flex flex-col mt-2">
                  Liberado por:
                  <input
                    className="border-solid border-b-2 outline-none"
                    type="text"
                    placeholder="Nome do coordenador responsável..."
                    value={saidaLiberadoPor}
                    onChange={(e) => setSaidaLiberadoPor(e.target.value)}
                  />
                  <input
                    className="border-solid border-b-2 outline-none"
                    type="text"
                    placeholder="código do pedido."
                    value={codigoPedido}
                    onChange={(e) => setCodigoPedido(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-700  p-2 rounded-sm mt-2
                            font-light text-xs text-white hover:bg-green-700"
                >
                  Registrar saída 📦
                </button>
              </form>

              <div className="border-solid border-t-2 outline-none mt-5">
                <p className="text-center font-bold">Relatório de saída:</p>

                <p>
                  <strong>Nome:</strong> {saidaEntregue}
                </p>
                <p>
                  <strong>Setor:</strong> {saidaSetor}
                </p>
                <p>
                  <strong>Quantidade: </strong>
                  {saidaQuantidade} <strong>Produto:</strong> {nome}
                </p>
                <p>
                  <strong>Liberado por: </strong>
                  {saidaLiberadoPor}
                </p>
                <p>
                  <strong>Código:</strong> {codigoPedido}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Home;
