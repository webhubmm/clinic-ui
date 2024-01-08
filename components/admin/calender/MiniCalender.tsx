'use client'
import { Card, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function MiniCalendar(props: { selectRange: boolean; [x: string]: any }) {
  const { selectRange, ...otherProps } = props;
  const [value, onChange] = useState(new Date());

  return (
    <Card py='20px' px='15px' alignItems='center'  w='48%' borderRadius='20px' {...otherProps}>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={'month'}
        tileContent={<Icon />}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
      />
    </Card>
  );
}
