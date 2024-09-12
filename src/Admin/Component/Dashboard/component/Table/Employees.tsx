import React, { useState } from 'react';
import { Card } from '../../../../../Components/Card/Card';
import CardHeader from '../../../../../Components/Card/CardHeader';
import {
  Box, Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { CardBody } from '../../../../../Components/Card/Cardbody';
import { TableDataRow } from './TableDataRow';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';

interface DataRow {
  email: string;
  username: string;
  password: string;
  role:string
  id:string
}
interface cardTableProps {
  title: string;
  data: DataRow[];
  captions: string[];
}
export const Employees: React.FC<cardTableProps> = ({
  title,
  data,
  captions,
}) => {
  const textColor = useColorModeValue('gray.700', 'white');
  let mainTeal = useColorModeValue('teal.300', 'teal.300');
  let inputBg = useColorModeValue('white', 'gray.800');
  let mainText = useColorModeValue('gray.700', 'gray.200');
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');
  let searchIcon = useColorModeValue('gray.700', 'gray.200');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter((row) =>
    row.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.password.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <React.Fragment>
      <Card
        overflowX={{ sm: 'scroll', xl: 'hidden' }}
        bg={'white'}
        padding={'22px'}
        borderRadius={'15px'}
        boxshadow={'rgba(0, 0, 0, 0.02) 0px 3.5px 5.5px'}
      >
        <CardHeader
          p="6px 0px 22px 0px"
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Box display={'flex'} justifyContent={'end'} >

            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="teal"
              variant="solid"
            >
              Delete All Employees
            </Button>

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
                  ></IconButton>
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

        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {captions.map((caption, idx) => {
                  return (
                    <Th
                      color="gray.400"
                      key={idx}
                      ps={idx === 0 ? '0px' : undefined}
                    >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((row) => {
                return (
                  <TableDataRow
                    name={row.username}
                    email={row.email}
                    password={row.password}
                    role={row.role}
                    id={row.id}

                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
