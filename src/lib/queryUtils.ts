export const calcularPagina = (pagina: number) => {
    const currentPage = Math.max(Number(pagina), 1);
    const porPagina = 5;
    const skip = (currentPage - 1) * porPagina;
    return { skip, porPagina };
  };