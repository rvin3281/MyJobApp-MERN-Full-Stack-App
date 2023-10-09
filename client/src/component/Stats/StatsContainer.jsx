import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ stats }) => {
  const adminStats = [
    {
      title: 'pending application',
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },

    {
      title: 'Interview Schedule',
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },

    {
      title: 'Jobs Declined',
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeee',
    },
  ];

  return (
    <Wrapper>
      {adminStats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
