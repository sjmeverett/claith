import * as React from 'react';
import { CommonDivProps, prefix, classes } from './util';
import { ClickTargetProps, ClickTarget } from './buttons';


export const ListGroup = (props: CommonDivProps) => (
  <div className={classes(props, 'list-group')}>
    {props.children}
  </div>
);

export const ListGroupItem = (props: ClickTargetProps) => (
  <ClickTarget {...props} className={classes(props, 'list-group-item')} />
);
