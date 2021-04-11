export interface ButtonProps {
  name?: string;
  onClick: Function;
  className?: string;
  primary?: boolean;
  loading?: boolean;
  link?: boolean;
  color?: string;
  icon?: React.ElementType<any>;
  children: React.ElementType<any> | string;
  [e: string]: any;
}
