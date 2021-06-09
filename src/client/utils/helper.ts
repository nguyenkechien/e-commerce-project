export const getListPages = (
  totalPages: number = 0,
  activePage: number = 0,
) => {
  return Array.from({ length: totalPages }).map((val, i) => {
    const pageNumber: number = ++i;
    return { pageNumber, activePage: activePage === pageNumber };
  });
};

export const getRndInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
