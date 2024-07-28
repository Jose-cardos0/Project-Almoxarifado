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

  const [data, setData] = useState<ProdutosProps[]>([]);

  interface ProdutosProps {
    id: string;
    nome: string;
    desc: string;
    quantidade: number;
  }

  useEffect(() => {
    function getData() {
      const linksRef = collection(db, "produtos");
      const queryRef = query(linksRef);

      getDocs(queryRef).then((snapshot) => {
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
    getData();
  }, [data]);

  function handlesubmit(e: FormEvent) {
    e.preventDefault();

    if (!nome || !desc || quantidade == 0) {
      toast.warning("Necessário preencher os campos");
      setInterval(true);
      redAtention.current?.focus();
    } else {
      setInterval(false);
    }

    addDoc(collection(db, "produtos"), {
      nome: nome,
      desc: desc,
      quantidade: quantidade,
    });
  }

  function handleEdit(item: ProdutosProps) {
    setNome(item.nome);
    setDesc(item.desc);
    setQuantidade(item.quantidade);
    const id = item.id;
    setDataId(id);
  }

  async function handleSavedEdit(item: ProdutosProps) {
    await updateDoc(doc(db, "produtos", item.id), {
      nome: item.nome,
      desc: item.desc,
      quantidade: item.quantidade,
    });

    setDataId("");
  }

  return (
    <div className="flex w-full flex-col">
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
              onClick={() => handleSavedEdit}
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
        <div className="w-full">
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
                      className="bg-blue-700  px-3 rounded-sm 
                            font-light text-xs text-white hover:bg-red-500"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
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
