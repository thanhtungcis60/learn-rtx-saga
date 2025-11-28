import { useForm } from 'react-hook-form';
import { Student } from '../../../models';
import { Box, Button } from '@mui/material';
import { InputField, RadioGroupField } from '../../../component/FormFields';
import { useEffect } from 'react';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const { control, handleSubmit, reset } = useForm<Student>({
    defaultValues: initialValues,
  });
  //   useEffect(() => {
  //     reset(initialValues); // 👈 Cập nhật form khi initialValue thay đổi ~ API trả về dữ liệu
  //   }, [initialValues, reset]);

  const handleFormSubmit = (formValues: Student) => {
    console.log('Submit', formValues);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <InputField name="city" control={control} label="City" />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
