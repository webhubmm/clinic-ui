  import { WrapItem,Wrap,Box, Card, CardHeader,CardBody, Container,Heading,Text } from "@chakra-ui/react";
  import Image from "next/image";
  import serviceCareImg from '@/public/assets/service_home-se.png';
  import oralimg from '@/public/assets/asset 12.svg';
  import smilImg from '@/public/assets/asset 13.svg';
  import reactImg from '@/public/assets/asset 14.svg';
  import plusImg from '@/public/assets/asset 15.svg';
  import checkUpImg from '@/public/assets/asset 16.svg';
  import braceImg from '@/public/assets/asset 17.svg';
  import { FaArrowRight } from "react-icons/fa6";
  import ServiceCard from "./ServiceCard";
  import ContainerBox from "@/components/common/container/Container";

  const serviceCardList =[
    {
      id:100,
      title:"Oral Pathologist",
      imgIcons:oralimg,
      desc:'Conduct research to advance our understanding of oral health and disease.'
    },
    {
      id:200,
      title:"Pediatric Dentist",
      imgIcons:smilImg,
      desc:'Conduct research to advance our understanding of oral health and disease.'
    },
    {
      id:300,
      title:"Cosmetic Dentistry",
      imgIcons:reactImg,
      desc:"Overall can transform the appearance of a person 's  teeth and improve"
    },
    {
      id:400,
      title:"General Dentist",
      imgIcons:plusImg,
      desc:'People who are self-conscious about their teeth may avoid smiling or feel embarrasse.'
    },
    {
      id:500,
      title:"Teeth Checkup",
      imgIcons:checkUpImg,
      desc:'Regular teeth checkups are an essential part of maintaining good oral health.'
    },
    {
      id:600,
      title:"Dental Braces",
      imgIcons:braceImg,
      desc:'Braces effectively align teeth, improving their positioning and symmetry.'
    }
  ]
  export default function ServicesCare() {
    return (
      <Box bg='neat.pearlwhite' paddingTop='8rem' paddingBottom={{sm:'8rem',lg:'40rem'}}>
          <ContainerBox>
            <Box position='relative'>
            <Box display='flex'  marginBottom={{sm:'30px',lg:'0px'}} flexDir={{sm:'column',lg:'row'}}  justifyContent={{sm:'center',lg:'space-around'}} alignItems={{sm:'center',lg:'start'}} gap='5'>
              <Box>
                  <Image src={serviceCareImg} alt="service img"
                  width={600} height={500}/>
              </Box> 
              <Box display='grid' gap='5' maxW='lg' mt='10'>
                  <Text color='neat.primary' fontWeight='600'>
                    Our services

                  </Text>
                  <Heading color='neat.secondary'>
                      Dental care services

                  </Heading>
                  <Text color='slate' fontSize='20px' lineHeight={2}>
                      We prioritize your oral health and well-being. Booking an appointment with our experienced team is simple and convenient.


                  </Text>
              </Box>    

            </Box>
            <Box display='flex' justifyContent={{sm: 'center', lg: 'unset'}}>
              <Wrap  spacing={{sm:'30px',lg:'30px'}}   position={{lg:'absolute'}} top={{lg:'57%'}} left={{lg:'15%'}}>
                {
                  serviceCardList?.map((item) =>(
                        <WrapItem key={item.id}  >
                          
                          <ServiceCard item={item}/>
                        </WrapItem>
                  ))
                }
              

              </Wrap>
          </Box>

            
          </Box>

            
      
  </ContainerBox>
      </Box>
    )
  }
