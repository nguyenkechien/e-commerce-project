export const getListPages = (
  totalPages: number = 0,
  activePage: number = 0,
) => {
  // return Array.from({ length: totalPages }).map((v, i) => ++i);
  return Array.from({ length: totalPages }).map((val, i) => {
    const pageNumber: number = ++i;
    return { pageNumber, activePage: activePage === pageNumber };
  });
};
