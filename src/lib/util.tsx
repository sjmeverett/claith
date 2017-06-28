import * as React from 'react';

export type BootstrapCommonStyles = 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type BootstrapStyles = BootstrapCommonStyles | 'default';
export type BackgroundColors = BootstrapCommonStyles | 'inverse' | 'faded';
export type TextColors = BootstrapCommonStyles | 'muted' | 'white';


export interface CommonProps<T> extends React.Props<T> {
  className?: string;
  bg?: BackgroundColors;
  fg?: TextColors;
};


export interface CommonDivProps extends CommonProps<HTMLDivElement> {
};


export function prefix(value, prefix: string, defaultValue?: string) {
  value = value || defaultValue;
  return value ? `${prefix}-${value}` : null;
};


export function classes(...classes: string[]);
export function classes(props: CommonProps<any>, ...classes: string[])
export function classes(props: CommonProps<any> | string, ...classes: string[]) {
  const common = typeof props === 'object' && props !== null
    ? [
      props.className,
      prefix(props.bg, 'bg'),
      prefix(props.fg, 'text')
    ]
    : [props];

  return [
      ...common,
      ...classes
    ]
    .filter((cls) => !!cls)
    .join(' ');
};

