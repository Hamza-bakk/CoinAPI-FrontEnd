import React, { useState, useEffect } from 'react';
import { PostAPI } from '../../backend/ApiRESTFULL/post/post';

const { ResendActivationEmail } = PostAPI;

export const ResendConfirmationEmail = () => {
    const [email, setEmail] = useState(""); 
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    const [count, setCount] = useState(60);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const resendEmailAxio = async () => {
        try {
            await ResendActivationEmail(email);
            setIsButtonDisabled(true); 
            setCount(60);
        } catch (error) { 
            console.error("Erreur lors de la réexpédition de l'email d'activation :", error);
        }
    };

    useEffect(() => {
        let timer: number = 60;
        if (count > 0 && isButtonDisabled) {
            timer = setTimeout(() => {
                setCount(prevCount => prevCount - 1); 
            }, 1000); 
        } else if (count === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [count, isButtonDisabled]);

    return (
        <>
            <div className="flex flex-col gradient-background min-h-screen text-black">
                <input 
                    id="email" 
                    name='email'
                    className='flex h-10 w-90 mt-64 mx-auto rounded-lg pl-4 focus:outline-none'
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Saisissez votre email ici" 
                />
                <button 
                    className={`flex h-10 w-90 mt-8 mx-auto pl-4 focus:outline-none bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={resendEmailAxio}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? `Attendre (${count}s)` : 'Renvoyer le email de confirmation'}
                </button> 
                <a
                    href="/login"
                    className="flex h-10 w-90 mt-8 mx-auto pl-4 focus:outline-none bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Connexion
                </a>
            </div>
        </>
    );
};
