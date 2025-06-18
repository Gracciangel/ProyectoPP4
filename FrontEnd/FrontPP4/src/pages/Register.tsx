import { useState } from "react"
import { Inputs } from "../Components/Atmos/inputs/Inputs"
import type { IRegisterUser } from "../Interfaces/user/IUser"
import { Button } from "../Components/Atmos/buttons/Button";
import { authUser } from "../Helpers/user";


export const Register = () => {
    const [registerValue, setRegusterValue] = useState<IRegisterUser>({
        name:'',
        email: '',
        password:'',
        rol_id:2
    }) ;

    const handleRegister = async () => {
        const response = await authUser(true,undefined,  registerValue) ;
        console.log(response)
    }


  return (
    <div>
        <h1>Registráte</h1>
        <div>
            <Inputs 
            required={true}
            type='text' 
            placeholder="ingresá tu nombre"
            typeSize="md"
            onChange={(e)=> setRegusterValue({
                ...registerValue, name: e.target.value
            })}
            />
            <Inputs 
            required={true}
            type='text' 
            placeholder="ingresá tu email"
            typeSize="md"
            onChange={(e)=> setRegusterValue({
                ...registerValue, email: e.target.value
            })}
            />
            <Inputs 
            required={true}
            type='password' 
            placeholder="ingresá una contraseña"
            typeSize="md"
            onChange={(e)=> setRegusterValue({
                ...registerValue, password: e.target.value
            })}
            showText={true}
            />
            <Button type="success" action={handleRegister} label="Registrar" size="md"/>
        </div>
    </div>
  )
}
