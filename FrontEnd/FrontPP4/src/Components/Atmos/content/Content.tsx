interface IContentProp {
    title?:string;
    text: string; 
    size: 'sm' | 'md' | 'lg'
   classStyle?: 'Mint'| 'Lux' | 'Refer'
}

export const Content = ({text, size, title, classStyle}: IContentProp) => {
  return (
    <div className={size}>
        {
            title && 
            (
                <h1 className={`ContentTitle${classStyle}`} style={{fontSize:'30px'}}>{title}</h1>
            )
        }
        <p className={`content${classStyle}`}>{text}</p>
    </div>
  )
}
