export interface IFavorites {
    //esta interface es para guardar los libros favoritos de un usuario, para ello solocitamos el email para obtener el id del usuario y poder guardar el libro en la tabla de favoritos
    email: string;
    titleBook: string;
    pathPhoto: string;
}

export interface IFavoritesResponse {
    success: boolean;
    message: string;
}

export interface IFavoritesList {
    title :string;
    pathPhoto: string;
}