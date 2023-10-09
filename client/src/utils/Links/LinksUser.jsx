// import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
// import { MdAdminPanelSettings } from 'react-icons/md';

const linksUser = [
  {
    text: 'Create New Job',
    path: '.',
    icon: <FaWpforms />,
  },
  {
    text: 'View Your Job',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
];

export default linksUser;
