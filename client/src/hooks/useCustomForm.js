import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

export const useCustomForm = (schema) => {
  return useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
};

export const useProfileHookForm = (schema) => {
  return useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
};

export const useSearchForm = (schema) => {
  return useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      search: 'a',
      jobStatus: 'all',
      jobType: 'all',
      sort: 'a-z',
    },
  });
};
