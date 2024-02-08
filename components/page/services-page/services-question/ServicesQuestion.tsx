  import AccordionQues from "@/components/common/accordion/AccordionQues";
  import { Box,Container,Heading} from "@chakra-ui/react";
  import ContainerBox from "@/components/common/container/Container";

  const listsAsk = [
    {
      id:200,
      title:'How can I prevent cavities?'
    },
     {
      id:300,
      title:'How can I prevent cavities?'
    },
     {
      id:400,
      title:'What is gum disease and how can it be prevented?'
    },
      {
      id:500,
      title:'How can I whiten my teeth?'
    },
       {
      id:600,
      title:'How can I prevent cavities?'
    },
     {
      id:700,
      title:'What is gum disease and how can it be prevented?'
    },
      {
      id:800,
      title:'How can I whiten my teeth?'
    },

  ]
  export default function ServicesQuestion() {
    return (
      <Box bg='neat.pearlwhite' paddingY='6rem'>
        {/* <Container maxW='container.xl'> */}
          <ContainerBox>
          
          <Box display='flex' justifyContent='center' >
            <Heading color='neat.secondary'>
              Frequently asked questions

              </Heading>
            </Box>
            <Box marginTop='40px'>
              <Container maxW='container.lg'>
              {
                listsAsk?.map((item)=>(

                  <AccordionQues item={item} key={item.id}/>
                ))
              }

              </Container>

              </Box>
          </ContainerBox>

        {/* </Container> */}
      </Box>
    )
  }
