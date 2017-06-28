import * as React from 'react';
import { CommonDivProps, prefix, classes } from './util';


export interface ContainerProps extends CommonDivProps {
  fluid?: boolean;
};

export const Container = (props: ContainerProps) => (
  <div className={classes(props, props.fluid ? 'container-fluid w-100' : 'container')}>
    {props.children}
  </div>
);

export const Row = (props: CommonDivProps) => (
  <div className={classes(props, 'row')}>
    {props.children}
  </div>
);

export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type JustifyContent = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'between' ;

export interface ColProps extends CommonDivProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  align?: AlignItems;
};

export const Col = (props: ColProps) => (
  <div className={classes(props, 'col',
      prefix(props.xs, 'col-xs'),
      prefix(props.sm, 'col-sm'),
      prefix(props.md, 'col-md'),
      prefix(props.lg, 'col-lg'),
      prefix(props.xl, 'col-xl'),
      prefix(props.align, 'align-self')
    )}>
    {props.children}
  </div>
);


export interface FlexProps extends CommonDivProps {
  justify?: JustifyContent;
  align?: AlignItems;
};

export const Flex = (props: FlexProps) => (
  <div className={classes(props, 'd-flex', prefix(props.justify, 'justify-content'), prefix(props.align, 'align-items'))}>
    {props.children}
  </div>
);
