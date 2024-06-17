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
  return <CommonLayout>Please Click Menu in Sidebar to Navigate</CommonLayout>;
};

export default Home;
