import { useState } from "react";
import { Inputs } from "../Components/Atmos/inputs/Inputs";
import type { IRegisterUser
 } from "../Interfaces/user/IUser";
import { ButtonCustom } from "../Components/Atmos/buttons/Button";
import { authUser } from "../Helpers/user";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { PiPassword } from "react-icons/pi";
import {
  Alert,
} from "@chakra-ui/react";

export const Register = () => {
  const [error, setError] = useState<{ err: boolean; msjErr: string }>();
  const [registerOk, setRegisterOk] = useState<{ ok: boolean; msjOk: string }>();
  const [registerValue, setRegisterValue] = useState<IRegisterUser>({
    name: "",
    email: "",
    password: "",
    rol_id: 2,
  });

  const handleRegister = async () => {
    try {
         
      const response = await authUser(true, undefined, registerValue);
      if (response.success) {
          setError(undefined); 
        
        setRegisterOk({
          ok: true,
          msjOk:  Array.isArray(response.result)
                      ? ((response.result[0] as { msj?: string })?.msj ?? 'hubo un error ')
                      : ((response.result as { msj?: string })?.msj ?? 'hubo un error ')
        });
    
      } else {
          setRegisterOk(undefined); 
        setError({
          err: true,
          msjErr: Array.isArray(response.result)
                      ? ((response.result[0] as { error?: string })?.error ?? 'hubo un error ')
                      : ((response.result as { error?: string })?.error ?? 'hubo un error ')
                    });
                   
                    
      }
      
      
    } catch (err) {
      setError({
        err: true,
        msjErr: "Ocurrió un error inesperado.",
      });
      setRegisterOk(undefined);
      console.error(err);
    }
  };
  
  
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
        styleButton={<FaUserPlus />}
      />

      {/* Mensaje de éxito */}
     {registerOk?.ok && (
        <Alert.Root status="success" mt={4}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{registerOk.msjOk}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}

      {/* Mensaje de error */}
      {error?.err && (
        <Alert.Root status="error" mt={4}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error.msjErr}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}
    </div>
  );
};
