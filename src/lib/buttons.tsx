import * as React from 'react';
import { CommonProps, prefix, classes, BootstrapStyles } from './util';
import { TriggerKeyProps, triggerKey } from './trigger-key';
import { Link } from 'react-router-dom';

export interface ClickTargetProps extends CommonProps<any>, TriggerKeyProps {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  to?: string;
  title?: string;
  disabled?: boolean;
  type?: string;
};

export const clickTarget = 
  (defaultElement: string | React.StatelessComponent<any>) =>
  triggerKey()(
    (props: ClickTargetProps) => {
      const className = classes(props);
      const {href, onClick, to, ...rest} = props;
      let _props: ClickTargetProps = {...rest, className};
      let element;

      if (href) {
        element = 'a';
        _props.href = href;

      } else if (onClick) {
        element = 'button';
        _props.onClick = onClick;

      } else if (to) {
        element = Link;
        _props.to = to;

      } else {
        element = defaultElement;
      }

      return React.createElement(element, {..._props, role: 'button'});
    }
  );

export const ClickTarget = clickTarget('div');


export interface ButtonProps extends ClickTargetProps, TriggerKeyProps {
  bsStyle?: BootstrapStyles;
  fab?: boolean;
  submit?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {bsStyle, fab, submit, bg, fg, ...buttonProps} = props;
  
  buttonProps.className = classes(
    props, 'btn',
    prefix(bsStyle, 'btn', 'secondary'), fab && 'fab'
  );

  if (submit) {
    buttonProps.type = 'submit';
  }

  const Target = clickTarget(submit ? 'button' : 'div');
  return <Target {...buttonProps} />
};
