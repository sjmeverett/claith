import * as React from 'react';
import { BootstrapStyles, CommonProps, CommonDivProps, prefix, classes } from './util';

export interface BadgeProps extends CommonDivProps {
  bsStyle?: BootstrapStyles;
  pill?: boolean;
};

export const Badge = (props: BadgeProps) => (
  <div className={classes(props, 'badge', prefix(props.bsStyle, 'badge', 'default'), props.pill && 'badge-pill')}>
    {props.children}
  </div>
);

export const SmallLabel = (props: CommonProps<any>) => (
  <small className={classes(props, 'text-muted', 'mr-3', 'small-label')}>
    {props.children}
  </small>
);
