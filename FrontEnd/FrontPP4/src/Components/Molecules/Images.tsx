

interface IImageProps{
    routePath : string  
}

export const Images = ({routePath}:IImageProps) => {
  return (
    <div data-aos='fade-right' >
        <img src={routePath} alt="imagen" style={
            
            {
                width: '100px',
                height: '100px',
                objectFit: 'cover'
            }
        }/>
    </div>
  )
}
