import { Search } from '@mui/icons-material';
import { Box, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { City, ListParams } from '../../../models';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gap: 2, // tương đương spacing={2}
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
        }}
      >
        <Box>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="SearchByName">Search by name</InputLabel>
            <OutlinedInput
              id="SearchByName"
              label="Search by name"
              endAdornment={<Search />}
              defaultValue={filter.name_like || ''}
              onChange={handleSearchChange}
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
