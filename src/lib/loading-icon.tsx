import * as React from 'react';

export interface Props {
  immediate?: boolean;
  timeout?: number;
  className?: string;
};

export interface State {
  show: boolean;
};

export class LoadingIcon extends React.Component<Props, State> {
  private timeout: number;

  constructor(props) {
    super(props);
    this.state = {show: props.immediate};
  }

  componentWillMount() {
    if (!this.props.immediate) {
      this.timeout = window.setTimeout(() => {
        this.setState({
          show: true
        });
      }, this.props.timeout || 300)
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  render() {
    return (
      <svg className={`loading-icon ${this.props.className || ''} ${this.state.show ? '' : 'hidden'}`}
          xmlns='http://www.w3.org/2000/svg'
          width='120px' height='120px'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'>

        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(0 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(30 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(60 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(90 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(120 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(150 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(180 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(210 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(240 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(270 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(300 50 50) translate(0 -30)' className='bar' />
        <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' transform='rotate(330 50 50) translate(0 -30)' className='bar' />
      </svg>
    );
  }
}


export const PaddedLoadingIcon = (props) => (
  <div className='loading-container'>
    <div className='loading-wrapper'>
      <LoadingIcon />
    </div>
  </div>
);
