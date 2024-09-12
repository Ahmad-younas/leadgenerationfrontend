import React from 'react';
import { NavbarLinks } from '../../../../Components/Navbar/NavbarLinks';
import {
  getLastPathSegment,
  getSecondLastPathSegment,
} from '../../../../RoutePath/Path';
import { Stack } from '@chakra-ui/react';
import { AllJobsTable } from './Table/AllJobsTable';

export const AllJobs = () => {
  return (
    <React.Fragment>
      <Stack spacing={4}>
        <NavbarLinks
          brandText={getSecondLastPathSegment(window.location.pathname)}
          brandTextS={getLastPathSegment(window.location.pathname)}
        />
        <AllJobsTable />
      </Stack>
    </React.Fragment>
  );
};
