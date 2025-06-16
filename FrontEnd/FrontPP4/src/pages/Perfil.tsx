import { useEffect, useState } from "react";

export const Perfil = () => {
  const [user, setUser] = useState<{ email: string; name: string }>();

useEffect(() => {
  const localUser = localStorage.getItem("user");
  if (localUser) {
    try {
      const parsed = JSON.parse(localUser);
      setUser(parsed[0]); // ← accedemos al primer usuario del array
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
    }
  }
}, []);


  return <h1>{`hola ${user?.name || "invitado"}`}</h1>;
};
