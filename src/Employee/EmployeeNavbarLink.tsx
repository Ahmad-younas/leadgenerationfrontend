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
} from '@chakra-ui/react';

import { BellIcon } from '@chakra-ui/icons';
import { PersonIcon } from '../Components/Icons/Icons';
import { EmployeeNavbarLinkProps } from '../interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export const EmployeeNavbarLink: React.FC<EmployeeNavbarLinkProps> = (props) => {
  const navigate = useNavigate();
  const {
    brandText,
    brandTextS,
    mainTextColor,
    secondaryTextColor,
    navbarIconColor,
    backgroundColor,
  } = props;

  return (
    <Flex
      minH={'75px'}
      borderRadius={'16px'}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      bg={backgroundColor}
      lineHeight={'25.6px'}
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
            <BreadcrumbLink color={secondaryTextColor}>Dashboard</BreadcrumbLink>
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
          <MenuButton style={{ marginLeft: '10px' }} onClick={()=>navigate('/admin/setting')}>
            <PersonIcon color={navbarIconColor} w="25px" h="25px" />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton style={{ marginLeft: '10px' }}>
            <BellIcon color={navbarIconColor} w="25px" h="25px" />
          </MenuButton>
        </Menu>
      </Box>
    </Flex>
  );
};
