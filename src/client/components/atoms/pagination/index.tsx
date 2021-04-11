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

  return (
    <div className="pagination">
      <ul className="pagination-list">
        {
          pages.map(({ pageNumber }) => (
            <li
              key={pageNumber}
              className={`pagination-items ${activePage === pageNumber ? 'active' : ''}`}
              onClick={() => change(pageNumber)}
            >
              <span className="pagination-item">
                {pageNumber}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
