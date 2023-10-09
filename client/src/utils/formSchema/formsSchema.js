import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  lastName: yup.string().required('LastName is required'),
  location: yup.string().required('Location is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid Email Format'),
  password: yup.string().required('Password is required'),
  passwordConfirm: yup
    .string()
    .label('confirm password')
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password not match'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid Email Format'),
  password: yup.string().required('Password is required'),
});

export const createJobSchema = yup.object({
  position: yup.string().required('Position is required'),
  company: yup.string().required('Position is required'),
  jobLocation: yup.string().required('Job Location is required'),
  jobStatus: yup.string().required('Job Status is required'),
  jobType: yup.string().required('Job Type is required'),
});

export const editJobSchema = yup.object({
  position: yup.string().required('Position is required'),
  company: yup.string().required('Company is required'),
  jobLocation: yup.string().required('Job Location is required'),
  jobStatus: yup.string().required('Job Status is required'),
  jobType: yup.string().required('Job Type is required'),
});

export const updateProfileSchema = yup.object({
  // Other fields here...
  name: yup.string().required('Name is required'),
  // Define the "avatar" field with conditional validation
  avatar: yup.mixed().test('fileSize', 'File size is too large', (value) => {
    // Check if a file was selected and its size is less than 5MB (5000KB)
    if (value && value.length) {
      return value[0].size <= 5000000; // 5MB in bytes
    }
    return true; // No file selected, so it's valid
  }),
});
