const urlBook = 'https://gutendex.com/books/?page=1&page_size=100';


export const GetBooks = async () => {
    try{

        const request = await fetch(urlBook,{
            method:'GET'

        })
        const response = await request.json() ; 
        
        
        console.log(response)
        return response
    }catch(error){
        console.log(error  + "error al obtener los libros")
    }
}
