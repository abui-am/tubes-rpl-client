import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../components/layouts/common';
const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get('Authorization');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  return <CommonLayout>Test</CommonLayout>;
};

export default Home;
