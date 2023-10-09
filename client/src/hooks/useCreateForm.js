import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useNavigate, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getError, resetError } from '../slices/formSlice';

import {
  createUser,
  login,
  createJobApi,
  editJobApi,
  currentUser,
  deleteJobId,
  updateProfile,
} from '../api/apis';

export const useMutateSignup = (reset) => {
  // NOTE : MUTATE -> GET THE DATA AS OBJECT FROM FORM PASS TO MUTATION FUNCTION
  // NOTE : isLOADING -> CAN USED TO DISPLAY LOADING STATE WHEN FORM SUBMITTING

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      toast.success('Thanks for Register');
      // NOTE : QUERY INVALIDATION CAN SET HERE AFTER FORM SUBMISSION SUCCESS
      dispatch(resetError());
      // Reset Form
      reset();

      // NOTE : USE useNavigation HOOK from REACT ROUTER TO NAVIGATE FROM CURRENT PAGE AFTER FORM SUBMISSION SUCCESS
      navigate('/login');
    },
    onError: (error) => {
      const errorArray = error?.response?.data?.message
        .split(',')
        .map((errorMsg, i) => ({
          errorMsg: errorMsg.trim(),
          key: i,
        }));

      // console.log(errorArray);
      dispatch(getError(errorArray));

      // NOTE : THIS ERROR RETURN FROM THE AXIOS
      toast.error('Failed! Please Try Again');
    },
  });
};

export const useLoginForm = (reset) => {
  const queryClient = useQueryClient(); // ! INVALIDATE QUERIES
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: async () => {
      // AUTHORIZATION
      try {
        dispatch(resetError()); // Once logged in successfully we display Error message
        reset();
        const { data } = await currentUser();

        if (data) {
          queryClient.invalidateQueries();
          toast.success('Access Approved');
          navigate('/dashboard');
        } else {
          throw new Error('Your data missing from the system');
        }
      } catch (error) {
        toast.error('You are not authorize to access');
        console.log(error);
      }
    },
    onError: (error) => {
      const errorArray = error?.response?.data?.message
        .split(',')
        .map((errorMsg, i) => ({
          errorMsg: errorMsg.trim(),
          key: i,
        }));

      // console.log(errorArray);
      dispatch(getError(errorArray));

      // NOTE : THIS ERROR RETURN FROM THE AXIOS
      toast.error('Failed! Please Try Again');
    },
  });
};

export const useCreateJob = (reset, role) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (data) => createJobApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alljobs'] });
      queryClient.invalidateQueries({ queryKey: ['alljobsadmin'] });
      queryClient.invalidateQueries({ queryKey: ['appstats'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });

      toast.success('New Job Successfully Created');
      dispatch(resetError()); // Once logged in successfully we display Error message
      reset();
      role === 'user'
        ? navigate('/dashboard/all-jobs')
        : navigate('/dashboard/all-jobs-admin');
    },
    onError: (error) => {
      const errorArray = error?.response?.data?.message
        .split(',')
        .map((errorMsg, i) => ({
          errorMsg: errorMsg.trim(),
          key: i,
        }));

      // console.log(errorArray);
      dispatch(getError(errorArray));

      // NOTE : THIS ERROR RETURN FROM THE AXIOS
      toast.error('Failed! Please Try Again');
    },
  });
};

export const useEditForm = (reset, id) => {
  const state = useSelector((state) => state.auth.user);
  const role = state?.role;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data, id }) => editJobApi({ data, id }),
    onSuccess: () => {
      if (role === 'user') {
        queryClient.invalidateQueries({ queryKey: ['alljobs'] });

        toast.success(`'Form Successfully Updated'`);
        navigate('/dashboard/all-jobs');
      } else {
        queryClient.invalidateQueries({ queryKey: ['alljobsadmin'] });
        toast.success(`'Form Successfully Updated'`);
        navigate('/dashboard/all-jobs-admin');
      }
      queryClient.invalidateQueries({ queryKey: ['singlejob', id] });
      dispatch(resetError()); // Once logged in successfully we display Error message
      reset();
    },
    onError: (error) => {
      const errorArray = error?.response?.data?.message
        .split(',')
        .map((errorMsg, i) => ({
          errorMsg: errorMsg.trim(),
          key: i,
        }));

      // console.log(errorArray);
      dispatch(getError(errorArray));

      // NOTE : THIS ERROR RETURN FROM THE AXIOS
      toast.error('Failed! Please Try Again');
    },
  });
};

export const useDeleteJob = () => {
  const state = useSelector((state) => state.auth.user);
  const role = state?.role;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id) => deleteJobId(_id),
    onSuccess: () => {
      if (role === 'user') {
        queryClient.invalidateQueries({ queryKey: ['alljobs'] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['alljobsadmin'] });
      }
      toast.success('Successfully Deleted');
    },
    onError: (error) => {
      toast.error('Not able to delete');
      console.log(error);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Profile Updated');
      dispatch(resetError()); // Once logged in successfully we display Error message
    },
    onError: (error) => {
      const errorArray = error?.response?.data?.message
        .split(',')
        .map((errorMsg, i) => ({
          errorMsg: errorMsg.trim(),
          key: i,
        }));

      // console.log(errorArray);
      dispatch(getError(errorArray));

      // NOTE : THIS ERROR RETURN FROM THE AXIOS
      toast.error('Failed! Please Try Again');
    },
  });
};
