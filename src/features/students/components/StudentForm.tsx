import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import { InputField, RadioGroupField } from '../../../component/FormFields';
import { SelectField } from '../../../component/FormFields/SelectField';
import { Student } from '../../../models';
import { selectCityOptions } from '../../city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { getErrorMessage } from '../../../utils';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter name.')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;

        const parts = value?.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .integer('Please enter an integer.')
      .min(18, 'Min is 18.')
      .max(80, 'Max is 80.')
      .required('Please enter age.')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  //   useEffect(() => {
  //     reset(initialValues); // 👈 Cập nhật form khi initialValue thay đổi ~ API trả về dữ liệu
  //   }, [initialValues, reset]);

  const handleFormSubmit = async (formValues: Student) => {
    // console.log('Submit', formValues);
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  return (
    <Box maxWidth={400}>
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
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            {isSubmitting && <CircularProgress color="primary" size={16} />} &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
