import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';


export const ConfirmNewPassword = () => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom)

  useEffect(() => {
    if (!user.id) {
    navigate('/login');  
    toast.success('The new password has been confirmed', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
    }
  }, [user, navigate]);



  return (
    <>
    {user.id && (
    <div className="flex gradient-background flex-col items-center justify-center h-screen">
      <div className="flex w-full border-spacing-8 flex-col max-w-lg p-8 gap-8 bg-white text-center rounded-lg shadow-lg">
        <p className="text-green-600 font-semibold text-lg">
          We confirm the change of your password.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Go to Home
        </button>
      </div>
    </div>
    )
    
    },
    </>
  );
};
