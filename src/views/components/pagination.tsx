import React, { useState } from 'react';
interface PaginationProps {
  pages: {
    pageNumber: number;
    activePage: boolean;
  }[],
  onChange?: Function
}

export const Pagination = ({ pages, onChange }: PaginationProps) => {

  const [activePage, setActivePage] = useState(pages.find(o => o.activePage)?.pageNumber);

  const change = (pageNumber: number) => {
    if (pageNumber === activePage) return;
    setActivePage(pageNumber);
    if (typeof onChange === 'function') onChange(pageNumber);
  }

  return <ul className="pagination">
    {
      pages.map(({ pageNumber }) => (
        <li
          key={pageNumber}
          className={`${activePage === pageNumber ? 'active' : ''}`}
          onClick={() => change(pageNumber)}
        >
          {pageNumber}
        </li>
      ))
    }
  </ul>
}
