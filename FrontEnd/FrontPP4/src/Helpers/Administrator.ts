const url = 'http://localhost:3000/api/' ;

export const getAllUsersForAdmin = async (): Promise<{
  success: boolean;
  msj: string;
  data: {
    Rol: string;
    email: string;
    name: string;
    photoUrl: string;
  }[];
}> => {
  try {
    const response = await fetch(url + 'allUsers', { method: 'GET' });
    if (!response.ok) {
      throw new Error('No se pudieron obtener los usuarios');
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error(err);
    // Devuelvo el mismo shape aunque haya error
    return {
      success: false,
      msj: err.message || 'Error en la petición',
      data: [] // vacío en caso de fallo
    };
  }
};

