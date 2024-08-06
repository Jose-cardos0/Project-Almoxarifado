import { useEffect, useState } from "react";

interface PropsSaida {
  id?: string;
  nomeSaida: string;
  nomeProd?: string;
  quantidade?: number | undefined;
  data?: Timestamp;
}

// db
import { db } from "../FireBase/FireBase";

// firebase
import { getDocs, collection, query, Timestamp } from "firebase/firestore";

export function Historico({ nomeSaida }: PropsSaida) {
  const [historico, setHistorico] = useState<PropsSaida[]>([]);
  const [nomeSaidaReg, setNomeSaidaReg] = useState("");
  const [listaDeSaidas, setListaDeSaidas] = useState<PropsSaida[]>([]);

  useEffect(() => {
    setNomeSaidaReg(nomeSaida);
  }, [nomeSaida]);

  useEffect(() => {
    setHistorico([]); // limpa o estado historico
    getItensSaidas(); // executa novamente a função getItensSaidas
  }, [nomeSaidaReg]);

  async function getItensSaidas() {
    const linksRef = collection(db, "Saidas");
    const queryRef = query(linksRef);

    await getDocs(queryRef).then((snapshot) => {
      let listadeItens = [] as PropsSaida[];

      snapshot.forEach((doc) => {
        listadeItens.push({
          id: doc.data().id,
          nomeSaida: doc.data().nome,
          nomeProd: doc.data().nomeProduto,
          quantidade: doc.data().quantidadeSaida,
          data: doc.data().data,
        });
      });

      setHistorico(listadeItens);
    });
  }

  useEffect(() => {
    if (nomeSaidaReg) {
      const filteredHistorico = historico.filter(
        (funcionario) => funcionario.nomeSaida === nomeSaidaReg
      );
      setListaDeSaidas(filteredHistorico);
    }
  }, [nomeSaidaReg, historico]);

  function formatDate(date: Timestamp | undefined) {
    if (date) {
      return date.toDate().toLocaleDateString();
    } else {
      return "";
    }
  }

  return (
    <div className="bg-white h-full p-3">
      {listaDeSaidas?.map((item) => (
        <div
          className="flex p-1 gap-1 justify-between max-w-full border-solid border-b-2 border-green-400"
          key={item.id}
        >
          <div className="flex gap-1">
            <p>Nome do item:</p>
            <p className="text-red-700 font-semibold italic">{item.nomeProd}</p>
          </div>
          <div className="flex gap-1">
            <p>Data da saída:</p>
            <p className="text-red-700 font-semibold italic">
              {formatDate(item.data)}
            </p>
          </div>
          <div className="flex gap-1">
            <p>Quantidade:</p>
            <p className="text-red-700 font-semibold italic">
              {item.quantidade}
            </p>
          </div>
          <div>
            <p>🟢</p>
          </div>
        </div>
      ))}
    </div>
  );
}
