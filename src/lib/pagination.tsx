import * as React from 'react';
import * as _ from 'lodash';
import * as bs from './index';


const generateNumbers = (n, count) => {
  let numbers = _.range(-2, 3)
    .map((delta) => {
      let number = n + delta;
      let className = '';
      let ad = Math.abs(delta);

      if (ad === 1 && !(number === 2 && n === 3) && !(number === count - 1 && n === count - 2)) {
        className = 'hidden-xs-down';

      } else if (ad === 2) {
        className = 'hidden-sm-down'
      }

      return {
        number,
        className
      };
    })
    .filter((page) => page.number > 1 && page.number < count);

  if (numbers.length > 0) {
    const first = numbers[0].number;

    if (first === 3) {
      numbers.unshift({number: 2, className: 'hidden-sm-down'});
    }
    
    if (n > 3) {
      numbers.unshift({number: null, className: first > 3 ? '' : (n > 4 ? 'hidden-md-up' : 'hidden-sm-up')});
    }

    const last = numbers[numbers.length - 1].number;

    if (last === count - 2) {
      numbers.push({number: count - 1, className: 'hidden-sm-down'});
    }

    if (n < count - 2) {
      numbers.push({number: null, className: last < count - 2 ? '' : (n < count - 3 ? 'hidden-md-up' : 'hidden-sm-up')});
    }
  }

  numbers.unshift({number: 1, className: ''});

  if (count > 1) {
    numbers.push({number: count, className: ''});
  }

  return numbers;
};


export interface PaginationProps {
  page: number;
  count: number;
  onGoPage?: (page: number) => any;
};


export const Pagination = (props: PaginationProps) => (
  <div className='btn-toolbar page-bar' role='toolbar' aria-label='pagination'>
    <small className='text-muted mr-2 align-self-center'>current page</small>

    {props.page > 1
      ? (
        <bs.Button className='mr-2' onClick={(e) => props.onGoPage && props.onGoPage(props.page - 1)} triggerKey='ArrowLeft'>
          <i className='fa fa-long-arrow-left'></i>
        </bs.Button>
      ) : null
    }

    <div className='btn-group' role='group' aria-label='pages'>
      {generateNumbers(props.page, props.count).map((page, i) => (
        page.number === null
          ? (
            <span className={`btn btn-secondary ellipsis ${page.className}`} key={`sep${i}`}></span>
          ) : (
            <bs.Button className={`${page.number === props.page ? ' active' : ''} ${page.className}`} key={page.number}
               onClick={(e) => props.onGoPage && props.onGoPage(page.number)}>
              {page.number}
            </bs.Button>
          )
      ))}
    </div>

    {props.page < props.count
      ? (
        <bs.Button className='ml-2' onClick={(e) => props.onGoPage && props.onGoPage(props.page + 1)} triggerKey='ArrowRight'>
          <i className='fa fa-long-arrow-right'></i>
        </bs.Button>
      ) : null
    }
  </div>
);
