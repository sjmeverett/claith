import * as React from 'react';
import { CommonProps, prefix, classes } from './util';
import { ZxcvbnMeter } from './password-meter';

export interface ExtendedChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  optionValue?: any;
};

export interface FormGroupModel {
  value: any;
  valid: boolean;
  errors: string[];
};

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
  onChange: React.EventHandler<ExtendedChangeEvent>;
  model?: FormGroupModel;
};

export const FormGroup = (props: FormGroupProps) => {
  let {
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
    model,
    value,
    ...inputProps
  } = props;

  let children: React.ReactNode;

  if (model) {
    ({errors, valid, value} = model);
  }

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
    const {onChange, ...checkProps} = inputProps;
    
    if (type === 'radio') {
      checkProps['value'] = optionValue;
    }
    
    children = (
      <label className='form-check-label'>
        <input type={type}
          className={classes('form-check-input', !valid && 'form-control-danger')}
          checked={value === optionValue}
          {...checkProps}
          onChange={(e) => onChange({...e, optionValue: e.target.checked ? optionValue : false})}
          />&nbsp;
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
          ? <textarea className={classes('form-control', !valid && 'form-control-danger')}
              value={value} {...inputProps} />
          : <input type={type} className={classes('form-control', !valid && 'form-control-danger')}
              value={value} {...inputProps} />
        }

        {showStrength
          ? <ZxcvbnMeter password={value} />
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
