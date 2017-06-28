import * as React from 'react';
import { CommonDivProps, prefix, classes } from './util';

export type NavbarStyle = 'light' | 'inverse';

export interface NavbarProps extends CommonDivProps {
  bsStyle?: NavbarStyle;
};

export const Navbar = (props: NavbarProps) => (
  <div>
    <nav className={classes(props, 'navbar', prefix(props.bsStyle, 'navbar', 'light'))}>
      {props.children}
    </nav>
  </div>
);

export const NavbarBrand = (props: CommonDivProps) => (
  <div className={classes(props, 'navbar-brand')}>
    {props.children}
  </div>
);
