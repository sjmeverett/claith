import * as React from "react";
import * as ReactDOM from "react-dom";
import { CommonDivProps, prefix, classes } from "./util";

export interface TriggerKeyProps {
  triggerKey?: string;
}

const decorator = (Component, keyHandler) =>
  class KeyButton extends React.Component<any, any> {
    componentWillMount() {
      window.addEventListener("keydown", keyHandler, false);
    }

    componentWillUnmount() {
      window.removeEventListener("keydown", keyHandler, false);
    }

    render() {
      const { keyHandler, ...props } = this.props;
      return React.createElement(Component, props);
    }
  };

export const triggerKey = (key?: string) => <T extends Object>(
  Component: React.ComponentClass<T> | React.StatelessComponent<T>
): React.StatelessComponent<T & TriggerKeyProps> => {
  const _key = key;

  return (props: T & TriggerKeyProps) => {
    const { triggerKey, ...rest } = <TriggerKeyProps>props;
    const key = triggerKey || _key;
    let element;

    if (key) {
      const keyHandler = event => {
        if (event.key === (triggerKey || _key) && element) {
          element.dispatchEvent(new MouseEvent("click"));
          event.preventDefault();
        }
      };

      return React.createElement(decorator(Component, keyHandler), {
        ref(ref) {
          element = ref && ReactDOM.findDOMNode(ref);
        },

        ...rest
      });
    } else {
      return React.createElement(<any>Component, rest);
    }
  };
};
