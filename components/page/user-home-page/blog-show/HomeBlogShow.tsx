    import { Box, Container, Heading, Text } from "@chakra-ui/react";
import HomeBlogCard from "./HomeBlogCard";
import blogOne from '@/public/assets/blogOne_image13.png';
import blogTwo  from "@/public/assets/blog_imageTwo.png";
import blogThree from '@/public/assets/blog_imageThree14.png';
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
            <Container maxW='container.xl'>
                
        <Box display='grid' justifyItems='center' alignItems='center' gap='5'>
            <Text color='neat.primary' fontWeight='600'>
                Our blogs

            </Text>
            <Heading color='neat.secondary'>
               Separating fact from fiction

            </Heading>
        </Box>

        <Box marginTop='4rem' display='flex' alignItems='center' justifyContent='space-evenly'>
            {
                blogsLists?.map((item) =>(
                    <HomeBlogCard item={item} key={item.id}/>
                ))
            }
            {/* <HomeBlogCard />
            <HomeBlogCard />
            <HomeBlogCard /> */}

        </Box>

        </Container>
        </Box>
    )
    }
