import { VFC } from 'react';
import "./FormCard.css"

type Props = {
  title: string;
  children: JSX.Element;
};

const Form: VFC<Props> = (props) => {
  const { title, children } = props;

  return (
    <div className="form-card">
      <div className="form-title">{title}</div>
      <div className="form-wrapper">{children}</div>
    </div>
  );
};

export default Form;
