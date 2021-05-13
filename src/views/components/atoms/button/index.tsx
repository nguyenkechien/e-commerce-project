import React from 'react';
import { ButtonProps } from './interface';
import classNames from 'classnames';
// import './button.scss';
import { IconLoading } from '../icon/loading';


export const Button = ({ name, onClick, children, className, primary, link, icon, loading, ...props }: ButtonProps) => {
  const classTag: string = classNames('btn', className, { 'btn-primary': primary }, { 'btn-loading': loading });
  const ChildrenComponent = () => {
    return (<>
      {loading && <span className="btn-icon-loading"><IconLoading loading={loading} /></span>}
      <span className="btn-content">
        {icon && <span className={classNames('btn-icon')}>{icon}</span>}
        {name || children}
      </span>
    </>)
  }

  if (link) {
    return (
      <a className={classTag} href={props.href || '#'} {...props}>
        <ChildrenComponent />
      </a>
    )
  }
  return (
    <button className={classTag} onClick={(e) => onClick(e)} {...props}>
      <ChildrenComponent />
    </button>
  )
}
