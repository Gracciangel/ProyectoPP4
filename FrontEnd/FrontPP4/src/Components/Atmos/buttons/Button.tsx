
import { Button, Stack } from '@chakra-ui/react';
import type { IButtons } from '../../../Interfaces/buttons/IButtons'
import '../../../Styles/Components.css' ;


export const ButtonCustom = ({ action, label, load, IconButton, styleButton, disabled , margin}: IButtons) => {
  return (
        
    <Stack direction="row" gap="4" align="center">

      <Button
        marginTop={margin ? margin.top : ''}
        marginBottom={margin? margin.bottom : ''}
        loading={load?.loading}
        colorPalette={styleButton?.colorPalette}
        variant={styleButton?.variant}
        onClick={action}
        disabled={disabled}
      >
        
        {
          IconButton && 
          (
            IconButton
          )
        } {label}
      </Button>
     
    </Stack>
      
  )
}
