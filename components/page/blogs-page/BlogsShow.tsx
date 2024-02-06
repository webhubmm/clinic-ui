import { Box, Container, Heading, Text,Wrap,WrapItem } from "@chakra-ui/react";
import blogOne from '@/public/assets/blogOne_image13.png';
import blogTwo  from "@/public/assets/blog_imageTwo.png";
import blogThree from '@/public/assets/blog_imageThree14.png';
import BlogsCard from "@/components/common/blogscard/BlogsCard";
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
        
    },
      {
        id:48,
        blogImg:blogOne,
        title:" How Oral Health Affects You Overall",

    },
    {
        id:49,
        blogImg:blogTwo,
        title:"Say goodbye to stains and discoloration",

    },
      {
        id:50,
        blogImg:blogThree,
        title:"Top foods to keep your teeth healthy",
        
    }
]
export default function BlogsShow() {
  return (
    <Wrap marginTop='4rem' spacing={10}>
            {
                blogsLists?.map((item) =>(
                  <WrapItem key={item.id}>
                    <BlogsCard blogImg={item.blogImg} title={item?.title} />
                   </WrapItem> 
                ))
            }
            

        </Wrap>
  )
}
