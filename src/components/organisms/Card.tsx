import { VFC } from 'react';
import './Card.css';

type Props = {
  title?: string;
  children: JSX.Element;
};

const Card: VFC<Props> = (props) => {
  const { title, children } = props;

  return (
    <div className="card">
      {title && <div className="title">{title}</div>}
      {children}
    </div>
  );
};

export default Card;
