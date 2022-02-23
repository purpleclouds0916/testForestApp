/* eslint-disable no-self-assign */
/* eslint-disable no-return-assign */
/* eslint-disable */

import { VFC } from 'react';

type Props = {
  children: JSX.Element;
  title?: string;
  description?: string;
};

const FormItem: VFC<Props> = (props) => {
  const { children, title, description } = props;

  return (
    <>
      {title && <div className={' form-field-item-title'}>{title}</div>}
      {description && (
        <p className="form-field-item-description">{description}</p>
      )}
      {children}
    </>
  );
};

export default FormItem;
