import React, { useState } from 'react';
import { City, Student } from '../../../models';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleRemoveClick = (student: Student) => {
    //Set selected student
    setSelectedStudent(student);

    //set confirm dialog
    setOpen(true);
  };
  return (
    <>
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
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove a student?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student "{selectedStudent?.name}".
            <br /> This action can not be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onRemove?.(selectedStudent as Student);
              setOpen(false);
            }}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
