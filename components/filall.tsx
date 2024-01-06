<Box px='15px'>

     <Grid templateColumns="repeat(3, 1fr)" gap={5} >
      <GridItem>
	  <AnalysticsBox />
      </GridItem>
	  <GridItem>
	  <AnalysticsBox />
      </GridItem>
	  <GridItem>
	  <AnalysticsBox />
      </GridItem>
  </Grid>
	
	

    <Grid templateColumns="repeat(2, 1fr)" my='22px' gap={5} >
      <GridItem>

        <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' p='20px'  borderRadius='20px'>
			<Flex align='center' justify='space-between' w='100%' pe='20px' pt='5px'>
				<Button bg="#fdfdfd" fontSize='sm' fontWeight='500' color='gray' borderRadius='7px'>
					{/* <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me='4px' /> */}
					This month
				</Button>
<Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'  color='#422afb'>
          <SiGoogleanalytics  size={20}/>
          </Center>
			</Flex>
			<Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }}>
				<Flex flexDirection='column' me='20px' mt='28px'>
					<Text color='#000' fontSize='34px' textAlign='start' fontWeight='700' lineHeight='100%'>
						$37.5K
					</Text>
					<Flex align='center' mb='20px'>
						<Text color='secondaryGray.600' fontSize='sm' fontWeight='500' mt='4px' me='12px'>
							Total Spent
						</Text>
						<Flex align='center'>
							{/* <Icon as={FaDollarSign} color='green.500' me='2px' mt='2px' /> */}
							<Text color='green.500' fontSize='sm' fontWeight='700'>
								+2.45%
							</Text>
						</Flex>
					</Flex>

					<Flex align='center'>
						{/* <Icon as={IoCheckmarkCircle} color='green.500' me='4px' /> */}
						<Text color='green.500' fontSize='md' fontWeight='700'>
							On track
						</Text>
					</Flex>
				</Flex>
				<Box minH='260px' minW='75%' mt='auto'>
					<LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent} />
				</Box>
			</Flex>
		</Card>
     </GridItem>

           <GridItem>
        	<Card alignItems='center' flexDirection='column'    mb='0px' p='10px'  borderRadius='20px'>
			<Flex align='center' w='100%' px='15px' py='20px'>	
				<Text me='auto' color='#000' fontSize='xl' fontWeight='700' lineHeight='100%'>
					Weekly Revenue
				</Text>
				<Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'  color='#422afb'>
          <SiGoogleanalytics  size={20}/>
          </Center>
			</Flex>

			<Box h='240px' mt='auto' w='100%'>
				<ColumnChart chartData={barChartDataConsumption} chartOptions={barChartOptionsConsumption} />
			</Box>
		</Card>
           </GridItem>

   {/* </Grid> */}

        {/* <Grid templateColumns="repeat(2, 1fr)" my='22px' gap={5} > */}
      <GridItem>
         <Card flexDirection='column' w='100%' x='10px' overflowX={{ sm: 'scroll', lg: 'hidden' }}  borderRadius='20px' py='20px'>
		<Flex px='25px' mb="5px" justifyContent='space-between' align='center'>
				<Text color='#000' fontSize='22px' fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
				<HStack >
          <Center height='40px' bg="#f4f7fe" p='10px' borderRadius='10px'>
          <BsThreeDots  size={20}/>
          </Center>
        </HStack> 

			</Flex>
				{/* <Text  fontSize='22px' mb="4px" fontWeight='700' lineHeight='100%'>
					Check Table
				</Text>
          */}
  <Table size='md'  variant='simple' color='gray.500'   borderRadius='20px'  >
    <Thead >
      <Tr>
        <Th>Name</Th>
        <Th >Email</Th>
        <Th >Date </Th>
        <Th >Progress</Th>
        


      </Tr>
    </Thead>
    <Tbody fontWeight="bold">
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>

   
 <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
      <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
   <Tr>
        <Td >
          <Flex align='center'>
					<Checkbox  colorScheme='purple' me='10px' color='blue' />
					<Text  fontSize='sm' fontWeight='700'>
						Leo
					</Text>
				</Flex>
        </Td>
        <Td>
          Leo@gmail.com
          </Td>
                  <Td >{new Date().toLocaleDateString()}</Td>
              <Td >
          <Progress hasStripe  colorScheme='blue' size='sm' value={30}/>
        </Td>     

      </Tr>
        
    </Tbody>
   
  </Table>
  </Card>
        </GridItem>

      <GridItem >
  <HStack spacing='10px' align='stretch'>
  <Card alignItems='center' flexDirection='column' w='100%' py='20px' px='15px' borderRadius='20px'>
			<Flex justify='space-between' align='start' px='10px' pt='5px' w='100%'>
				<Flex flexDirection='column' align='start' >
					<Flex w='100%'>
						<Text me='auto' color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Daily Traffic
						</Text>
					</Flex>
					<Flex align='end'>
						<Text color='#000' fontSize='34px' fontWeight='700' lineHeight='100%'>
							2.579
						</Text>
						<Text ms='6px' color='secondaryGray.600' fontSize='sm' fontWeight='500'>
							Visitors
						</Text>
					</Flex>
				</Flex>
				<Flex align='center'>
					{/* <Icon as={RiArrowUpSFill} color='green.500' /> */}
					<Text color='green.500' fontSize='sm' fontWeight='700'>
						+2.45%
					</Text>
				</Flex>
			</Flex>
			<Box h='240px' mt='auto'>
				<ColumnChart chartData={barChartDataDailyTraffic} chartOptions={barChartOptionsDailyTraffic} />
			</Box>
 </Card>

        <Card py='20px' px='15px' alignItems='center' flexDirection='column' w='100%' borderRadius='20px'>
			<Flex
				px={{ base: '0px', '2xl': '10px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'>
				<Text color="#000" fontSize='md' fontWeight='600' mt='4px'>
					Your Pie Chart
				</Text>
				<Select fontSize='sm' variant='subtle' defaultValue='monthly' width='unset' fontWeight='700'>
					<option value='daily'>Daily</option>
					<option value='monthly'>Monthly</option>
					<option value='yearly'>Yearly</option>
				</Select>
			</Flex>

			<PieChart h='100%' w='100%' chartData={pieChartData} chartOptions={pieChartOptions} />
			<Card
				bg="#fff"
				flexDirection='row'
				w='100%'
				p='15px'
				px='20px'
				mt='15px'
				mx='auto'>
				<Flex direction='column' py='5px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							Your files
						</Text>
					</Flex>
					<Text fontSize='lg' color="#000" fontWeight='700'>
						63%
					</Text>
				</Flex>
				<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
				<Flex direction='column' py='5px' me='10px'>
					<Flex align='center'>
						<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
						<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
							System
						</Text>
					</Flex>
					<Text fontSize='lg' color='#fff' fontWeight='700'>
						25%
					</Text>
				</Flex>
			</Card>
		</Card>
</HStack>
     </GridItem>
     </Grid>
   
</Box>