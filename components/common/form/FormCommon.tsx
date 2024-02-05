import { Box, Checkbox, FormControl, Heading ,Input,Text, Textarea} from "@chakra-ui/react";
import ButtonPrimary from "../button/ButtonPrimary";

export default function FormCommon() {
  return (
                <Box display='grid' gap='5'
                >
                  <Box 
                  color='neat.secondary'
                  >
                    <Heading>Book an appointment</Heading>
                  </Box>
                  <Text 
                  color="neat.secondary"
                  >
                    Get your dental health back on track with us
                  </Text>
                  <form action="" 
                  // className="space-y-5"
                  >
                  <Box color='gray' display='grid' gap='5'>
                    <Box 
                    display="flex" justifyContent='space-between'
                    gap='10'
                    >
                      <Box>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Name"
                            padding={8}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            padding={8}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    <Box>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          padding={8}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <Input type="tel" placeholder="Phone" padding={8} />
                      </FormControl>
                    </Box>
                    <Box 
                    display='flex'
                    // className="flex"
                    >
                      <Box 
                      flex='1'
                      // className="flex-1"
                      >
                        <FormControl>
                          <Input type="date" placeholder="Date" paddingY='32px'/>
                        </FormControl>
                      </Box>
                    </Box>
                    <Box 
                    marginBottom='40px'
                    // className="mb-10"
                    >
                      <FormControl>
                        <Textarea placeholder="Message" cols={5} rows={6} />
                      </FormControl>
                    </Box>
                    <Box 
                    display="flex"
                    alignContent='center'
                    justifyContent='space-between'
                    >
                      <Checkbox colorScheme="gray">Email subscribe</Checkbox>
                      <ButtonPrimary placeholder="Book Now"></ButtonPrimary>
                    </Box>
                    </Box> 
                  </form>
                </Box>  )
}
