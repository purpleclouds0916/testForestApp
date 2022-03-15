import React, { VFC } from 'react';

type Props = {
  children: JSX.Element;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
};

const FormItem: VFC<Props> = React.memo((props) => {
  const { children, title, description } = props;

  return (
    <>
      {title && <div className="form-field-item-title">{title}</div>}
      {description && (
        <div className="form-field-item-description">{description}</div>
      )}
      {children}
    </>
  );
});

export default FormItem;
