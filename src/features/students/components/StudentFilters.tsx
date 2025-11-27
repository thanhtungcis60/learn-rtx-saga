import { Search } from '@mui/icons-material';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent } from 'react';
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
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (e: SelectChangeEvent) => {
    if (!onChange) return;
    const newCity = e.target.value || undefined;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: newCity,
    };

    onChange(newFilter);
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
            lg: 'repeat(4, 1fr)',
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
        <Box>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
