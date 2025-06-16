import { LuEye, LuEyeOff } from 'react-icons/lu';
import type { IInputs } from '../../../Interfaces/inputs/IInputs';
import '../../../Styles/Login.css';
import { Input, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';

export const Inputs = ({ type, placeholder, onChange: returnValue, required, image }: IInputs) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <InputGroup 
        startElement={image} 
        endElement={
          type === 'password' ? (
            <div 
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </div>
          ) : null
        }
      >
        <Input 
        width={'240px'}
          placeholder={placeholder} 
          onChange={returnValue} 
          required={required} 
          type={type === 'password' && !showPassword ? 'password' : 'text'}
        />
      </InputGroup>
    </div>
  );
};