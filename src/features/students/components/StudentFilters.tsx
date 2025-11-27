import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent, useRef } from 'react';
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
  const searchRef = useRef<HTMLInputElement>();
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
  const handleSortChange = (e: SelectChangeEvent) => {
    if (!onChange) return;
    const newOrd = e.target.value || undefined;
    let _sort = undefined;
    let _order = undefined;
    if (newOrd !== undefined) {
      _sort = newOrd.split('.')[0];
      _order = newOrd.split('.')[1] as 'asc' | 'desc';
    }

    const newFilter: ListParams = {
      ...filter,
      _sort: _sort,
      _order: _order,
    };

    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    if (searchRef.current) searchRef.current.value = '';
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
              inputRef={searchRef}
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

        <Box>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary" size="small" onClick={handleClearFilter}>
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
