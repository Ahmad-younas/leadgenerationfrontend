import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GrEdit, GrView } from 'react-icons/gr';
import {
  Box, Button,
  Checkbox, Divider, Flex, HStack,
  IconButton, Input, InputGroup, InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr, useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineSelect } from 'react-icons/ai';
import { ViewEmployeeJob } from './ViewEmployeeJob';
import { SearchIcon } from '@chakra-ui/icons';
import { EditEmployeeJob } from './EditEmployeeJob';
interface Jobs {
  title:string,
  firstName: string;
  lastName:string;
  dateOfBirth:string
  email:string;
  contactNumber:string;
  address: string;
  id:number;
  user_id:number;
}

interface MetaData {
  totalPages: number;
  currentPage: number;
}
export const AllJobsTable = () => {
  let mainTeal = useColorModeValue('teal.300', 'teal.300');
  let inputBg = useColorModeValue('white', 'gray.800');
  let mainText = useColorModeValue('gray.700', 'gray.200');
  let searchIcon = useColorModeValue('gray.700', 'gray.200');

  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const onCloseModel = () => setIsOpenModel(false);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const totalPages = metaData?.totalPages ?? 5;
  const currentPage = metaData?.currentPage ?? 1;
  const [editData, setEditData] = useState({

    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    contactNumber: "",
    address: "",
    postcode: "",
    landlordName: "",
    landlordContactNumber: "",
    landlordEmail: "",
    agentName: "",
    agentContactNumber: "",
    agentEmail: "",
    heatingType: "",
    propertyType: "",
    epcRating: "",
    serviceType: "",
    assessmentDate: "",
    notes: "",
    month: "",
    year: "",
    username:"",
    role:"",
    userEmail:""
  });

  useEffect(() => {
        axios.get('http://localhost:3002/api/all-jobs').then(response=>{
          console.log('responseOfAllJobs', response.data);
          setJobs(response.data.jobs);
          setMetaData(response.data.meta);
        }).catch(error=>{
          console.log('error', error);
        });
    // Perform the GET request to fetch all jobs
  }, []);


  const fetchEmployeeInfo = (id:number ,user_id:number) => {
    axios.post('http://localhost:3002/api/get-Employee-Info-And-Employee-Job-Info', {
      employeeJobId: id, // Replace with actual employeeJobId
      employeeId: user_id,     // Replace with actual employeeId
    }).then(response => {
      console.log('response', response);
      const { employeeInfo, employeeJobInfo } = response.data;
      setEditData({
        title: employeeJobInfo.title || "",
        firstName: employeeJobInfo.firstName || "",
        lastName: employeeJobInfo.lastName || "",
        dateOfBirth: employeeJobInfo.dateOfBirth || "",
        email: employeeJobInfo.email || "",
        contactNumber: employeeJobInfo.contactNumber || "",
        address: employeeJobInfo.address || "",
        postcode: employeeJobInfo.postcode || "",
        landlordName: employeeJobInfo.landlordName || "",
        landlordContactNumber: employeeJobInfo.landlordContactNumber || "",
        landlordEmail: employeeJobInfo.landlordEmail || "",
        agentName: employeeJobInfo.agentName || "",
        agentContactNumber: employeeJobInfo.agentContactNumber || "",
        agentEmail: employeeJobInfo.agentEmail || "",
        heatingType: employeeJobInfo.heatingType || "",
        propertyType: employeeJobInfo.propertyType || "",
        epcRating: employeeJobInfo.epcRating || "",
        serviceType: employeeJobInfo.serviceType || "",
        assessmentDate: employeeJobInfo.assessmentDate || "",
        notes: employeeJobInfo.notes || "",
        month: employeeJobInfo.month || "",
        year: employeeJobInfo.year || "",
        username: employeeInfo.username || "",
        role: employeeInfo.role || "",
        userEmail: employeeInfo.email || ""
      });

      setIsOpenModel(true);
    }).catch(error => {
      console.log('error', error);
    });
  };


  const pageNumbers: number[] = [];

  for (let i = 1; i <=totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleButtonClicked = async (page: number) => {
    try {
      const response = await axios.get(
        'http://localhost:3002/api/all-jobs',{
          params:{
            page
          }
        }
      );
      console.log('response:', response.data);
      setJobs(response.data.jobs);
      setMetaData(response.data.meta);

    } catch (err) {
      console.log(err);
      // setError('Failed to fetch employee data.');
    } finally {
      console.log("unCatch error");
      // setLoading(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = jobs.filter((row) =>
    (row.title ? row.title.toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
    (row.email ? row.email.toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
    (row.firstName ? row.firstName.toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
    (row.lastName ? row.lastName.toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
    (row.address ? row.address.toLowerCase() : '').includes(searchQuery.toLowerCase()) ||
    (row.contactNumber ? row.contactNumber.toLowerCase() : '').includes(searchQuery.toLowerCase())
  );


  return (
    <React.Fragment>
      <ViewEmployeeJob isOpenModel={isOpenModel} onCloseModel={onCloseModel} data={editData}/>
      <EditEmployeeJob isOpenModel={isOpenModel} onCloseModel={onCloseModel} data={editData}/>
      <Box bg="white">
        <TableContainer p={'30px'}>

          <Box display={'flex'} justifyContent={'end'} pb={'10px'}>
            <InputGroup
              cursor="pointer"
              bg={inputBg}
              borderRadius="10px"
              mx={'10'}
              w={{
                sm: '128px',
                md: '200px',
              }}
              me={{ sm: 'auto', md: '20px' }}
              _focus={{
                borderColor: { mainTeal },
              }}
              _active={{
                borderColor: { mainTeal },
              }}
            >
              <InputLeftElement
                children={
                  <IconButton
                    bg="inherit"
                    borderRadius="inherit"
                    _hover={{
                      cursor: 'pointer',
                    }}
                    _active={{
                      bg: 'inherit',
                      transform: 'none',
                      borderColor: 'transparent',
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                    icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
                    aria-label={'Search Employee'}
                  >
                  </IconButton>
                }
              />
              <Input
                fontSize="xs"
                py="11px"
                color={mainText}
                placeholder="Type here..."
                borderRadius="inherit"
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>
                  <AiOutlineSelect
                    size={'17px'}
                    cursor={'pointer'}
                    onClick={() => {
                      console.log('clicked');
                    }}
                  />{' '}
                </Th>
                <Th>Title</Th>
                <Th>FirstName</Th>
                <Th>LastName</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Address</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{item.title}</Td>
                    <Td>{item.firstName}</Td>
                    <Td>{item.lastName}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.contactNumber}</Td>
                    <Td>{item.address}</Td>
                    <Td>
                      <IconButton
                        aria-label={'view'}
                        icon={<GrView/>}
                        color="teal"
                        onClick={()=>fetchEmployeeInfo(item.id,item.user_id)}
                        marginX={'5px'}
                      />
                      <IconButton
                        aria-label={'edit'}
                        icon={<GrEdit/>}
                        color="teal"
                        onClick={()=>fetchEmployeeInfo(item.id,item.user_id)}

                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td textAlign="center">
                    No Job is created
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          <Flex justify={'end'} mt={5} mb={5}>
            <HStack spacing={2}>
              <Button
                onClick={() => handleButtonClicked(currentPage-1)}
                isDisabled={currentPage === 1}
              >
                Previous
              </Button>
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  onClick={()=>handleButtonClicked(number)}
                  variant={currentPage === number ? 'solid' : 'outline'}
                >
                  {number}
                </Button>
              ))}
              <Button
                onClick={() => handleButtonClicked(currentPage +1 )}
                isDisabled={currentPage === totalPages}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};
