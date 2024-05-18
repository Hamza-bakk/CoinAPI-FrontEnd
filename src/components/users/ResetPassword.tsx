import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PostAPI } from "../../backend/ApiRESTFULL/post/post"

const {ResetPasswordAPI} = PostAPI 


export const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    const [count, setCount] = useState(60);

    const navigate = useNavigate()

    const hundleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value); // Vérifiez la valeur de l'input à chaque changement
        
        setEmail(event.target.value)
    }

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

    const ResetPassword = async() => {
        try {
            await ResetPasswordAPI(email)
            navigate("/login")
        } catch(erreur) {
            console.error("Erreur lors de la réexpédition de l'email d'activation :", erreur);
        }
    }
  return (
        <>
            <div className="flex flex-col gradient-background h-screen text-black">
                <input 
                    id="email" 
                    name='email'
                    className='flex h-10 w-90 mt-64 mx-auto rounded-lg pl-4 focus:outline-none'
                    value={email} 
                    onChange={hundleEmail} 
                    placeholder="Saisissez votre email ici" 
                />
                <button 
                    className={`flex h-10 w-90 mt-8 mx-auto pl-4 focus:outline-none bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={ResetPassword}
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
