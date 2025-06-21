import { useRef, useState } from "react";
import { Inputs } from "../Components/Atmos/inputs/Inputs";
import type { IRegisterUser } from "../Interfaces/user/IUser";
import { ButtonCustom } from "../Components/Atmos/buttons/Button";
import { authUser } from "../Helpers/user";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { PiPassword } from "react-icons/pi";
import { Alert } from "@chakra-ui/react";

export const Register = () => {
  
  const formRef = useRef<HTMLFormElement>(null);
  const [alertData, setAlertData] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  // Estado para el formulario de registro
  const [registerValue, setRegisterValue] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
    rol_id: 2,
  });

 const handleRegister = async () => {
    setAlertData(null);
    try {
      const response = await authUser(true, undefined, registerValue);
      if (response.success) {
        const msg = Array.isArray(response.result)
          ? ((response.result[0] as { msj?: string })?.msj ?? 'Registro exitoso')
          : ((response.result as { msj?: string })?.msj ?? 'Registro exitoso');
        setAlertData({ status: 'success', message: msg });
        // Limpia inputs físicamente
        formRef.current?.reset();
        // Resetea estado interno
        setRegisterValue({ name: "", email: "", password: "", rol_id: 2 });
      } else {
        const errMsg = Array.isArray(response.result)
          ? ((response.result[0] as { error?: string })?.error ?? 'Error al registrar')
          : ((response.result as { error?: string })?.error ?? 'Error al registrar');
        setAlertData({ status: 'error', message: errMsg });
      }
    } catch (err) {
      setAlertData({ status: 'error', message: 'Ocurrió un error inesperado.' });
      console.error(err);
    }
  };
console.log({alertData})

  return (
    <div className="Login">
      <h1>Regístrate</h1>

      <Inputs
        image={<FaUserAlt />}
        required
        type="text"
        placeholder="Ingresá tu nombre"
        onChange={(e) =>
          setRegisterValue({ ...registerValue, name: e.target.value })
        }
      />

      <Inputs
        image={<TfiEmail />}
        required
        type="text"
        placeholder="Ingresá tu email"
        onChange={(e) =>
          setRegisterValue({ ...registerValue, email: e.target.value })
        }
      />

      <Inputs
        image={<PiPassword />}
        required
        type="password"
        placeholder="Ingresá una contraseña"
        onChange={(e) =>
          setRegisterValue({ ...registerValue, password: e.target.value })
        }
        showText
      />

      <ButtonCustom
        type="success"
        action={handleRegister}
        label="Registrar"
        size="md"
        IconButton={<FaUserPlus />}
        styleButton={{
          variant: "outline",
          colorPalette: "green",
        }}
      />
      {alertData && (
        <Alert.Root status={alertData.status} mt={4} borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{alertData.message}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}
    </div>
  );
};
