import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { IoAddCircle } from 'react-icons/io5';
import { EmployeeNavbarLinkProps } from '../interfaces';
import { BellIcon } from '@chakra-ui/icons';
import { AiOutlineUser } from 'react-icons/ai';
import { PersonIcon } from '../Components/Icons/Icons';
export const EmployeeNavbarLink: React.FC<EmployeeNavbarLinkProps> = (
  props
) => {
  const {
    brandText,
    brandTextS,
    mainTextColor,
    secondaryTextColor,
    navbarIconColor,
    backgroundColor,
  } = props;
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');
  return (
    <Flex
      minH={'75px'}
      borderRadius={'16px'}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      bg={backgroundColor}
      line-height={'25.6px'}
      w={'100%'}
      pt="8px"
      top="18px"
      px={{
        sm: '15px',
        md: '30px',
      }}
      pb={'8px'}
      ps={{
        xl: '12px',
      }}
    >
      <Box>
        <Breadcrumb>
          <BreadcrumbItem color={mainTextColor}>
            <BreadcrumbLink color={secondaryTextColor}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem color={mainTextColor}>
            <BreadcrumbLink
              color={mainTextColor}
              textTransform={'capitalize'}
              style={{ cursor: 'default' }}
            >
              {brandText}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Link
          color={mainTextColor}
          textTransform={'capitalize'}
          href="#"
          bg="inherit"
          borderRadius="inherit"
          fontWeight="bold"
          _hover={{ color: mainTextColor }}
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
        >
          {brandTextS}
        </Link>
      </Box>
      <Box display={'flex'} alignItems={'start'}>
        <Menu>
          <MenuButton style={{ marginLeft: '10px' }}>
            <PersonIcon color={navbarIconColor} w="25px" h="25px" />
          </MenuButton>
          <MenuButton style={{ marginLeft: '10px' }}>
            <BellIcon color={navbarIconColor} w="25px" h="25px" />
          </MenuButton>
        </Menu>
      </Box>
    </Flex>
  );
};
