import { Box, Container, Heading, Text,Wrap } from "@chakra-ui/react";
import blogOne from '@/public/assets/blogOne_image13.png';
import blogTwo  from "@/public/assets/blog_imageTwo.png";
import blogThree from '@/public/assets/blog_imageThree14.png';
import BlogsCard from "@/components/common/blogscard/BlogsCard";
import ContainerBox from "@/components/common/container/Container";

const blogsLists =[
       {
        id:44,
        blogImg:blogOne,
        title:" How Oral Health Affects You Overall",

    },
    {
        id:45,
        blogImg:blogTwo,
        title:"Say goodbye to stains and discoloration",

    },
      {
        id:46,
        blogImg:blogThree,
        title:"Top foods to keep your teeth healthy",
        
    }
]
    export default function HomeBlogShow() {
    return (
        <Box paddingY='8rem'>
            {/* <Container maxW='container.xl'> */}
    <ContainerBox>
        <Box display='grid' justifyItems='center' alignItems='center' gap='5'>
            <Text color='neat.primary' fontWeight='600'>
                Our blogs

            </Text>
            <Heading color='neat.secondary'>
               Separating fact from fiction

            </Heading>
        </Box>

        <Box marginTop='4rem' display='flex' flexDir={{sm:"column",lg:'row'}} alignItems='center' justifyContent={{lg:'space-between'}}>
            {
                blogsLists?.map((item) =>(
                    
 
                        <BlogsCard  key={item.id} blogImg={item.blogImg} title={item?.title} />
                   
                ))
            }
            

        </Box>
</ContainerBox>
        {/* </Container> */}
        </Box>
    )
    }
