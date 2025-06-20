
import { Spinner } from '@chakra-ui/react';
import '../../Styles/spinner.css';
export const SpinnerCustom = () => {
  return (
     <Spinner
     size={'xl'}
    color="blue.800"
    css={{ "--spinner-track-color": "colors.gray.500" }}
  />
  )
}
