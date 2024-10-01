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
  Td, Text,
  Th,
  Thead,
  Tr, useColorModeValue, useToast,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineSelect } from 'react-icons/ai';
import { ViewEmployeeJob } from './ViewEmployeeJob';
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { EditEmployeeJob } from './EditEmployeeJob';
import { Jobs } from '../../../../../Employee/Jobs';
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
  let paginationButtonColor = useColorModeValue('teal.300','teal.300');

  const [isOpenViewEmployeeModel, setIsOpenViewEmployeeModel] = useState<boolean>(false);
  const [isOpenEditEmployeeModel, setIsOpenEditEmployeeModel] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const onCloseViewModel = () => setIsOpenViewEmployeeModel(false);
  const onCloseEditModel = () => setIsOpenEditEmployeeModel(false);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const totalPages = metaData?.totalPages ?? 5;
  const currentPage = metaData?.currentPage ?? 1;
  const toast = useToast();
  const [editData, setEditData] = useState({
    id:"",
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
    userEmail:"",
    status:""
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

  const handleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      console.log("HandleSelectAll",selectedJobs);
      setSelectedJobs([]); // Deselect all
    } else {
      console.log("HandleSelectAll",selectedJobs);
      setSelectedJobs(jobs.map(job => job.id)); // Select all
    }
    console.log("HandleSelectAll",selectedJobs);
  };
  const handleCheckboxChange = (jobId: number) => {
    setSelectedJobs(prevSelectedJobs =>
      prevSelectedJobs.includes(jobId)
        ? prevSelectedJobs.filter(id => id !== jobId)
        : [...prevSelectedJobs, jobId]
    );
  };

  const handleDeleteSelected = () => {

    if (selectedJobs.length === 0) {
      toast({
        title: 'No Jobs Selected',
        position:'top-right',
        description: 'Please select at least one job to delete.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    axios.post('http://localhost:3002/api/deleteSelectedJobs', { jobIds: selectedJobs })
      .then(response => {
        if (response.status === 200) {
          toast({
            title: 'Jobs Status',
            position:'top-right',
            description: response.data.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
        setJobs(jobs.filter(job => !selectedJobs.includes(job.id))); // Update the jobs state after deletion
        setSelectedJobs([]); // Clear selected jobs
      })
      .catch(error => {
        console.log('Error deleting jobs:', error);
      });
  };

  const token = localStorage.getItem('authToken');
  const handleDeleteAllJob = async () =>{
    if (jobs.length === 0) {
      toast({
        title: 'No Jobs Found',
        position:'top-right',
        description: 'Please enter the job first.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3002/api/deleteAllJobs', { jobIds: jobs },{
        withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      // Save the response in a variable
      const responseData = response.data;

      if (response.status === 200) {
        toast({
          title: 'Jobs Status',
          position: 'top-right',
          description: responseData.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setJobs([]);
        setSelectedJobs([]); // Clear selected jobs
      }
    } catch (error) {
      console.log('Error deleting jobs:', error);
      toast({
        title: 'Error',
        position: 'top-right',
        description: 'Failed to delete jobs.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const fetchEmployeeInfoForView = (id:number ,user_id:number) => {
    axios.post('http://localhost:3002/api/get-Employee-Info-And-Employee-Job-Info', {
      employeeJobId: id, // Replace with actual employeeJobId
      employeeId: user_id,     // Replace with actual employeeId
    }).then(response => {
      console.log('fetchEmployeeInfoForView');
      const { employeeInfo, employeeJobInfo } = response.data;
      setEditData({
        id:employeeJobInfo.id || "N/A",
        title: employeeJobInfo.title || "N/A",
        firstName: employeeJobInfo.firstName || "N/A",
        lastName: employeeJobInfo.lastName || "N/A",
        dateOfBirth: employeeJobInfo.dateOfBirth || "N/A",
        email: employeeJobInfo.email || "N/A",
        contactNumber: employeeJobInfo.contactNumber || "N/A",
        address: employeeJobInfo.address || "N/A",
        postcode: employeeJobInfo.postcode || "N/A",
        landlordName: employeeJobInfo.landlordName || "N/A",
        landlordContactNumber: employeeJobInfo.landlordContactNumber || "N/A",
        landlordEmail: employeeJobInfo.landlordEmail || "N/A",
        agentName: employeeJobInfo.agentName || "N/A",
        agentContactNumber: employeeJobInfo.agentContactNumber || "N/A",
        agentEmail: employeeJobInfo.agentEmail || "N/A",
        heatingType: employeeJobInfo.heatingType || "N/A",
        propertyType: employeeJobInfo.propertyType || "N/A",
        epcRating: employeeJobInfo.epcRating || "N/A",
        serviceType: employeeJobInfo.serviceType || "N/A",
        assessmentDate: employeeJobInfo.assessmentDate || "N/A",
        notes: employeeJobInfo.notes || "N/A",
        month: employeeJobInfo.month || "N/A",
        year: employeeJobInfo.year || "N/A",
        username: employeeInfo.username || "N/A",
        role: employeeInfo.role || "N/A",
        userEmail: employeeInfo.email || "N/A",
        status: employeeInfo.status || "N/A"
      });

      setIsOpenViewEmployeeModel(true);
    }).catch(error => {
      console.log('error', error);
    });
  };


  const fetchEmployeeInfoForEdit = (id:number ,user_id:number) => {
    axios.post('http://localhost:3002/api/get-Employee-Info-And-Employee-Job-Info', {
      employeeJobId: id, // Replace with actual employeeJobId
      employeeId: user_id,     // Replace with actual employeeId
    }).then(response => {
      console.log('fetchEmployeeInfoForEdit',response.data);
      const { employeeInfo, employeeJobInfo } = response.data;
      setEditData({
        id:employeeJobInfo.id || "",
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
        userEmail: employeeInfo.email || "",
        status: employeeInfo.status || ""
      });

      setIsOpenEditEmployeeModel(true);
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
      <ViewEmployeeJob isOpenModel={isOpenViewEmployeeModel} onCloseModel={onCloseViewModel} data={editData}/>
      <EditEmployeeJob isOpenModel={isOpenEditEmployeeModel} onCloseModel={onCloseEditModel} data={editData}/>

      {
        jobs?(<Box bg="white">
          <TableContainer p={'30px'}>

            <Box display={'flex'} justifyContent={'end'} pb={'10px'}>
              <Button  onClick={handleDeleteSelected} isDisabled={jobs.length === 0} colorScheme="red" w={{
                sm: '100px',
                md: '170px',
              }}> Delete Selected Jobs
              </Button>
              <Button onClick={handleDeleteAllJob} isDisabled={jobs.length === 0}  colorScheme={"red"} marginX={"20px"} w={{
                sm: '100px',
                md: '150px',
              }}>Delete All Job</Button>
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
                    <Checkbox
                      isChecked={selectedJobs.length === jobs.length}
                      onChange={handleSelectAll}
                      icon={<AiOutlineCheckCircle />} // Adding the custom icon
                    />
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
                        <Checkbox
                          isChecked={selectedJobs.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
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
                          onClick={()=>fetchEmployeeInfoForView(item.id,item.user_id)}
                          marginX={'5px'}
                        />
                        <IconButton
                          aria-label={'edit'}
                          icon={<GrEdit/>}
                          color="teal"
                          onClick={()=>fetchEmployeeInfoForEdit(item.id,item.user_id)}

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
                  leftIcon={<ArrowBackIcon />}
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
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => handleButtonClicked(currentPage +1 )}
                  isDisabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </HStack>
            </Flex>
          </TableContainer>
        </Box>):null
      }
    </React.Fragment>
  );
};
