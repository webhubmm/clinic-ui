import {
    Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
interface AccorProps {
  title:string;
}
export default function  AccordionQues({item}:{
  item:AccorProps
}){
    return (
       <Accordion allowMultiple >
  <AccordionItem border='1px' borderColor='gray_two' borderRadius='15px' padding='1.5rem' marginY='10px'>
    <h2>
      <AccordionButton _expanded={{bg:'neat.pearlwhite'}}>
        <Box as="span" flex='1' textAlign='left' color='neat.secondary' fontSize='lg' fontWeight='500'>
         {item?.title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} color='slate'>
   It is generally recommended to visit the dentist every six months for a routine check-up and cleaning. However, your dentist may suggest more frequent visits based on your individual needs.
    </AccordionPanel>
  </AccordionItem>

   
</Accordion>
    )
}