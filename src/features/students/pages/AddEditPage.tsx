import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Student } from '../../../models';
import studentApi from '../../../api/studentApi';

export interface AddEditPageProps {}

export default function AddEditPage(props: AddEditPageProps) {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    // IIFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);
  return (
    <Box>
      <Button onClick={() => navigate(-1)}>
        <ChevronLeft />
        &nbsp;Back to student list
      </Button>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
    </Box>
  );
}
