import React, { useState } from 'react';
import {
  Avatar,
  Flex,
  Td,
  Tr,
  Text,
  Button,
  useColorModeValue,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure, Box,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, EmailIcon } from '@chakra-ui/icons';
import { FocusableElement } from '@chakra-ui/utils';
import { Model } from './Model';
interface TableDataRowProps {
  name: string;
  email: string;
  password: string;
  role:string;
  id:string
}
export const TableDataRow: React.FC<TableDataRowProps> = (props) => {
  const { name, email, password , role, id} = props;
  const textColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    password: '',
    role:'',
    id:''
  });
  const onCloseModel = () => setIsOpenModel(false);
  const handleEditClick = () => {
    setEditData({ name, email, password, role, id });
    setIsOpenModel(true);
  };
  const handleDeleteEmployee = async (id:string)=>{

  }
  // const bgStatus = useColorModeValue("gray.400", "#1a202c");
  // const colorStatus = useColorModeValue("white", "gray.400");
  return (
    <React.Fragment>
      <Model isOpenModel={isOpenModel} onCloseModel={onCloseModel} data={editData}  />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Tr>
        <Td minWidth={{ sm: '250px', md: '200px', lg: '100px' }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar src={'ahmad'} w="50px" borderRadius="12px" me="18px" />
            <Flex direction="column">
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {email}
          </Text>
        </Td>
          <Td >
            <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem" >
              {password}
            </Text>
          </Td>
        <Td >
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem" >
            {role}
          </Text>
        </Td>
        <Td>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </Td>
        <Td>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={onOpen}
          >
            Delete
          </Button>
        </Td>
      </Tr>
    </React.Fragment>
  );
};
