import React, { useState } from 'react';
import { usePageContext } from '../core/PageContext';

interface PaginationProps {
  pages: {
    pageNumber: number;
    activePage: boolean;
  }[],
  onChange?: Function
}

export const Pagination = ({ pages, onChange }: PaginationProps) => {
  const [state, dispatch] = usePageContext();

  const [activePage, setActivePage] = useState(pages.find(o => o.activePage)?.pageNumber);

  const change = (pageNumber: number) => {
    dispatch({ type: 'PAGINATION', payload: pageNumber })
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
