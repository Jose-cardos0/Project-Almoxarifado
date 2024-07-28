import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FireBase/FireBase";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

interface PropsRoute {
  children: ReactNode;
}

export function Protect({ children }: PropsRoute) {
  const [loading, setLoading] = useState(true);
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const eyes = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setLogado(true);
      } else {
        setLoading(false);
        setLogado(false);
        navigate("/login", { replace: true });
      }
    });

    return () => {
      eyes();
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!logado) {
    return <Navigate to="/login" />;
  }

  return children;
}
