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
          className="flex p-1 gap-1 justify-between items-center 
          text-center max-w-full border-solid border-b-2
          max-md:flex max-md:flex-col"
          key={item.id}
        >
          <div className="flex gap-1 max-md:flex ">
            &#9745;
            <div className="flex max-md:flex-col">
              <p className="font-extralight mr-1 max-md:mr-0">Nome do item:</p>
              <p className="text-red-700 font-light italic">{item.nomeProd}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex max-md:flex-col">
              <p className="font-extralight mr-1 max-md:mr-0">Saída:</p>
              <p className="text-red-700 font-light italic">
                {formatDate(item.data)}
              </p>
            </div>
          </div>
          <div className="max-md:flex items-center justify-center gap-2 flex">
            <div className="flex gap-1">
              <p className="font-extralight mr-1 max-md:mr-0">Quantidade:</p>
              <p className="text-red-700 font-light italic">
                {item.quantidade}
              </p>
            </div>
            &#10004;
          </div>
        </div>
      ))}
    </div>
  );
}
