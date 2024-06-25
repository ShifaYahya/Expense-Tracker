import React from 'react';
import { TbReportMoney } from 'react-icons/tb';
import clipart1 from '../../assets/images/clipart2.png';
import googleLogoThumbnail from '../../assets/images/googleLogoThumbnail.png';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { auth, provider } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      console.log(results);
      const authInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL, // Corrected property name
        isAuth: true,
      };
      localStorage.setItem('auth', JSON.stringify(authInfo));
      navigate('/expense-tracker');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <>
      <div className='flex items-center gap-1 text-xl font-semibold ml-20 mt-8 text-[30px]'>
        <TbReportMoney className='text-[rgb(0,98,168)] text-[30px] font-bold' />
        ExpensePilot
      </div>
      <div className='flex flex-row gap-0 justify-center items-center'>
        <div className='mt-[110px] ml-[100px]'>
          <p className='font-bold text-[40px] text-black text-[40px]'>
            Take Control Of
            <br />
            <span className='text-[rgb(0,91,161)]'>Your Money</span>
          </p>
          <p className='text-[17px] font-normal'>
            Effortless expense tracking, empowering you to make <br /> informed financial decisions and achieve your goals
          </p>
          <p className='text-[19px] font-semibold pt-4'>Sign In with Google to continue..</p>
          <button
            className='text-white flex items-center gap-2 bg-black mt-7 rounded-md w-[190px] p-1 font-semibold hover:shadow-xxl'
            onClick={signInWithGoogle}
          >
            <img src={googleLogoThumbnail} height={20} width={20} alt='Google Logo' /> Sign In With Google
          </button>
        </div>
        <div className='mt-[60PX] mr-[150px] h-[400px] w-[400px] '>
          <img src={clipart1} alt='undraw_articles_wbpb' />
        </div>
      </div>
    </>
  );
};

export default LoginPage;