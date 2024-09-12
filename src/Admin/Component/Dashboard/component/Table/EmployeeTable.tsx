import {
  getLastPathSegment,
  getSecondLastPathSegment,
} from '../../../../../RoutePath/Path';
import { NavbarLinks } from '../../../../../Components/Navbar/NavbarLinks';
import React, { useEffect, useState } from 'react';
import { Statistics } from '../Statistics';
import { Box, Button, Flex, Heading, HStack, Skeleton, SkeletonText } from '@chakra-ui/react';
import { Employees } from './Employees';
import axios from 'axios';
interface MetaData {
  totalPages: number;
  currentPage: number;
}
export const EmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const totalPages = metaData?.totalPages ?? 5;
  const currentPage = metaData?.currentPage ?? 1;
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/all-employee/'
        );
        console.log('response:', response.data);
        setEmployeeData(response.data.data);
        console.log('responseMeta:', response.data.meta);
        setMetaData(response.data.meta);
        console.log('metadata',metaData?.totalPages);
      } catch (err) {
        setError('Failed to fetch employee data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);


  const pageNumbers: number[] = [];

  for (let i = 1; i <=totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleButtonClicked = async (page: number) => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/all-employee/',{
            params:{
              page
            }
          }
        );
        console.log('response:', response.data);
        setEmployeeData(response.data.data);
        setMetaData(response.data.meta);
      } catch (err) {
        setError('Failed to fetch employee data.');
      } finally {
        setLoading(false);
      }
    };
  return (
    <React.Fragment>
      <Box display={'flex'} flexDirection={'column'} width={'100%'}>
        <NavbarLinks
          brandText={getSecondLastPathSegment(window.location.pathname)}
          brandTextS={getLastPathSegment(window.location.pathname)}
        />
        <Box>
          <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
            {loading && (
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            )}
            {employeeData ? (
              !loading && (
                <Employees
                  title={'Registered Employees'}
                  data={employeeData}
                  captions={['Name', 'Email', 'Password','Role', 'Edit', 'Delete']}
                />
              )
            ) : (
              <Heading>Employees Not Registered</Heading>
            )}
          </Flex>
          <Flex justify={'end'} mt={2} mb={2}>
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
        </Box>

      </Box>

    </React.Fragment>
  );
};
