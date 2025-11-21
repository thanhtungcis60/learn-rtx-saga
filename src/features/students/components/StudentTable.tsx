import * as React from 'react';
import { City, Student } from '../../../models';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { capitalizeString, getMarkColor } from '../../../utils';

export interface StudentTableProps {
  studentList: Student[];
  cityMap: { [key: string]: City };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small" sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)} fontWeight="bold">
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{cityMap[student.city]?.name}</TableCell>
              <TableCell align="right">
                <Button
                  sx={{ mr: 1 }}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit?.(student)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => onRemove?.(student)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
