import * as React from 'react';
import * as bs from './index';
import * as _ from 'lodash';


export interface GroupedListProps<T> {
  elements: T[];
  className?: string;
};

export interface Group<T> {
  heading: string;
  subheading?: string;
  elements: T[];
};

export interface GroupItemProps<T> {
  element: T;
};


export function createGroupedList<TElement, TKey>(
    Item: React.ComponentClass<GroupItemProps<TElement>> | React.StatelessComponent<GroupItemProps<TElement>>,
    groupBy: _.ListIterator<TElement, TKey>,
    map: _.DictionaryIterator<TElement[], Group<TElement>> = (elements, heading) => ({elements, heading})
  ) {

  return (props: GroupedListProps<TElement>) => {
    const groups = _(props.elements)
      .groupBy(groupBy)
      .map(map)
      .value();
    
    if (groups.length) {
      return (
        <bs.ListGroup className={props.className}>
          {groups.map((group) => (
            [
              <bs.ListGroupItem className='bg-faded text-muted' key={group.heading}>
                <bs.Flex className='w-100' justify='between' align='center'>
                  <div>{group.heading}</div>
                  {group.subheading
                    ? <small>{group.subheading}</small>
                    : null
                  }
                </bs.Flex>
              </bs.ListGroupItem>,

              ...group.elements.map((element, i) => (
                <Item element={element} key={element['id'] || i} />
              ))
            ]
          ))}
        </bs.ListGroup>
      );

    } else {
      return <p className='text-center text-muted'>Nothing to display.</p>;
    }
  };
};
