import * as React from 'react';
import * as zxcvbn from 'zxcvbn';
import { CommonDivProps, prefix, classes } from './util';


export interface PasswordMeterProps extends CommonDivProps {
  score: 0 | 1 | 2 | 3 | 4;
  feedback?: string;
};

export const PasswordMeter = (props: PasswordMeterProps) => (
  <div className={classes(props, 'password-strength', prefix(props.score, 'score'))}>
    <div className='bar'>
      <div className='segment segment-0' />
      <div className='segment segment-1' />
      <div className='segment segment-2' />
      <div className='segment segment-3' />
      <div className='segment segment-4' />
    </div>

    { props.feedback && props.score !== 4
      ? <p dangerouslySetInnerHTML={{__html: props.feedback}} />
      : null              
    }
  </div>
);

export interface ZxcvbnProps extends CommonDivProps {
  password: string;
};

export const ZxcvbnMeter = (props: ZxcvbnProps) => {
  const result = checkPassword(props.password);
  return <PasswordMeter score={result.score} feedback={result.message} />;
};


const passwordHints = {
  english: 'common dictionary words',
  user_inputs: 'words like &ldquo;pharmacy&rdquo; or &ldquo;chemist&rdquo;',
  passwords: 'common passwords',
  repeat: 'repeats of several characters or words',
  sequence: 'sequences of letters or numbers',
  spatial: 'runs of adjacent keys'
};


function checkPassword(value) {
  const keywords = ['smartpharmacy', 'smart', 'pharmacy', 'chemist'];
  const result = zxcvbn(value, keywords);
  const m = {};

  const messages: string[] = result.sequence
    .map((x) => x.pattern === 'dictionary' ? x.dictionary_name : x.pattern)
    .map((x) => passwordHints[x])
    .filter((x) => x && !m[x] && (m[x] = true));
  
  let message;
  
  if (messages.length === 0) {
    message = null;

  } else if (messages.length === 1) {
    message = `Don&rsquo;t use ${messages[0]}.`;

  } else {
    message = `Don&rsquo;t  use ${messages.slice(0, -1).join(', ')}, or ${messages.slice(-1)}.`;
  }

  return {
    ...result,

    message,

    crackTime: result.crack_time_display === 'instant' 
      ? 'barely any time'
      : result.crack_times_display.offline_slow_hashing_1e4_per_second
  };
};
