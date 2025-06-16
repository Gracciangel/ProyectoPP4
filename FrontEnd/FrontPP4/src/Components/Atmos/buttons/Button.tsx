
import { Button, Stack } from '@chakra-ui/react';
import type { IButtons } from '../../../Interfaces/buttons/IButtons'
import '../../../Styles/Components.css' ;


export const ButtonCustom = ({ action, label, load, styleButton}: IButtons) => {
  return (
        
    <Stack direction="row" gap="4" align="center">

      <Button loading={load?.loading } colorPalette="teal" variant="solid"
      onClick={action}
      >
        
        {
          styleButton && 
          (
            styleButton
          )
        } {label}
      </Button>
     
    </Stack>
      
  )
}
