import * as React from 'react';
import { CommonProps, prefix, classes } from './util';
import { ZxcvbnMeter } from './password-meter';

export interface FormGroupProps extends CommonProps<any>, React.HTMLProps<any> {
  help?: string;
  label?: string;
  optional?: boolean;
  type?: string;
  showStrength?: boolean;
  value?: any;
  valid?: boolean;
  errors?: string[];
  optionValue?: any;
  inline?: boolean;
};

export const FormGroup = (props: FormGroupProps) => {
  const {
    help,
    label,
    optional,
    type = 'text',
    showStrength,
    valid,
    errors,
    className,
    bg,
    fg,
    id,
    optionValue=true,
    inline,
    ...inputProps
  } = props;

  let children: React.ReactNode;

  if (props.children) {
    children = (
      <div>
        {label
          ? <label className={classes('form-control-label', !optional && 'required')} htmlFor={props.id}>{label}</label>
          : null
        }

        {props.children}
      </div>
    );

  } else if (props.type === 'radio' || props.type === 'checkbox') {
    const {value, onChange, ...checkProps} = inputProps;
    
    if (type === 'radio') {
      checkProps['value'] = optionValue;
    }
    
    children = (
      <label className='form-check-label'>
        <input type={type}
          className={classes('form-check-input', !valid && 'form-control-danger')}
          checked={value === optionValue}
          {...checkProps}

          onChange={
              (e) => {
                if (e.target.checked) {
                  onChange({target: {value: optionValue}} as any);

                } else if (type === 'checkbox') {
                  onChange({target: {value: false}} as any);
                }
              }
            } />&nbsp;
        {label}
      </label>
    );

  } else {
    children = (
      <div>
        {label
          ? <label className={classes('form-control-label', !optional && 'required')} htmlFor={props.id}>{label}</label>
          : null
        }

        {type === 'textarea'
          ? <textarea className={classes('form-control', !valid && 'form-control-danger')} {...inputProps} />
          : <input type={type} className={classes('form-control', !valid && 'form-control-danger')} {...inputProps} />
        }

        {showStrength
          ? <ZxcvbnMeter password={inputProps.value} />
          : null
        }
      </div>
    );
  }

  return (
    <div className={classes(props,
        prefix((type === 'radio' || type === 'check') ? 'check' : 'group', 'form'),
        inline && 'form-check-inline',
        valid === false && 'has-danger'
      )}>

      {children}

      {errors && errors.length
        ? <small className='form-control-feedback'>{errors.join(', ')}</small>
        : null
      }

      {help
        ? <small className='form-text text-muted' key='help' dangerouslySetInnerHTML={{__html: help}} />
        : null
      }
    </div>
  );
};
