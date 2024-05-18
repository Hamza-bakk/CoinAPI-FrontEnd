import React, { Fragment, useEffect } from 'react';
import { API_URL } from '../../../config';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ConfirmationMail = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  
  const activeClick = () => {
    axios.post(`${API_URL}/auth/users/activation/`, { uid: uid, token: token })
      .then(() => {
        toast.success('Account Activate', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });        navigate('/login');
      })
      .catch(err => {
        alert(err.response.data);
        toast.error('A problem has Occured', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  
  useEffect(() => {
    activeClick();
  }, []);

  

  
  return (
    <>
      <Fragment>
        <button onClick={activeClick} className='flex gradient-background flex-col items-center justify-center h-screen'></button>
        <div className='text-white text-3xl text-center justify-center items-center'>
          Your account has been activated
        </div>
      </Fragment>
    </>
  );
  
}