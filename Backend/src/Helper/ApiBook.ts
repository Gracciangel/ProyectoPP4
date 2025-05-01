const urlBook = 'https://gutendex.com/books/?page=1&page_size=';

console.log(urlBook)    
export const GetBooks = async (pages: string) => {
    try{

        const request = await fetch(urlBook+pages,{
            method:'GET'

        })
        const response = await request.json() ; 
        
        console.log(`se obtubieron ${response.results.length} libros`)
        console.log(response.results[20])

    }catch(error){
        console.log(error  + "error al obtener los libros")
    }
}
