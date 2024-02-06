import BlogsCard from "@/components/common/blogscard/BlogsCard";
import ContainerBox from "@/components/common/container/Container";
import BlogsShow from "@/components/page/blogs-page/BlogsShow";
import { Box,Text ,Input,InputGroup,InputRightAddon,Heading} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function BlogsPage() {
  return (
    <Box bg='neat.pearlwhite' paddingY={{sm:'4rem',lg:'6rem'}}>
        <ContainerBox>
        <Box display='grid'   justifyContent='center'>
            <Heading color='neat.secondary' fontSize={{sm:'2rem',lg:'3rem'}}>
                Blog Posts

                </Heading>
                <Text color='slate'>
                    Separating fact from fiction

                </Text> 
        </Box>
        <BlogsShow />
        </ContainerBox>
    </Box>
  )
}
