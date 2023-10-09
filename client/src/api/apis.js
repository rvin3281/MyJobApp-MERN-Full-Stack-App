import customFetch from '../utils/customFetch';

// AXIOS Function
export const createUser = async (data) => {
  // NOTE : AXIOS RETURN PROMISES --> IF WE USE TRY CATCH THEN WE NEED TO HANDLE THE ERROR BY OURSELF
  // NOTE : AXIOS ONLY REJECT PROMISE IF NETWORK ERROR OR REQUEST CANCEL
  return await customFetch.post('/users/signup', data);
};

export const login = async (data) => {
  return await customFetch.post('/users/login', data);
};

export const currentUser = async () => {
  return await customFetch.get('/users/current-user');
};

export const createJobApi = async (data) => {
  return await customFetch.post('/jobs', data);
};

export const editJobApi = async ({ data, id }) => {
  return await customFetch.patch(`/jobs/${id}`, data);
};

export const getAllJob = async (params) => {
  return await customFetch.get('/jobs', { params });
};

//  SEARCH / FILTERING
export const getAllJobAdmin = async (params) => {
  // * PARAMS is THE DEFAULT NAME TO SEND QUERY TO BACKEND
  // * ON THE BACKEND WE CAN USE REQ.QUERY TO DESTRUCTURE
  return await customFetch.get('/admin/jobs', { params });
};

export const getJobId = async (id) => {
  return await customFetch.get(`/jobs/${id}`);
};

export const deleteJobId = async (id) => {
  return await customFetch.delete(`/jobs/${id}`);
};

export const getAppStats = async () => {
  return await customFetch.get('/users/admin/app-stats');
};

export const getAdminStats = async () => {
  return await customFetch.get('/admin/jobs/stats');
};

export const getUser = async () => {
  return await customFetch.get('/users/admin/app-stats');
};

export const updateProfile = async (formData) => {
  return await customFetch.patch(`/users/updateme`, formData);
};
