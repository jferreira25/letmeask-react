import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'


export function Home(){
    const history = useHistory();
    const { user, sigInWithGoogle,signOutWithGoogle} = useAuth();
    const [ roomCode, setRoomCode] = useState('');
    
   async function handleCreateRoom(){

       if(!user)
        await sigInWithGoogle();

        history.push('/rooms/new');
    }

    async function handleLoggoff(){
     
      
            await signOutWithGoogle();
    }

   async function handleJoinRoom(event:FormEvent){
        event.preventDefault();

        if(roomCode.trim() === '')
            return;

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas"></img>
                <strong>Crie Salas de Q&A ao vivo</strong>
                <p>tire as dúvidas de sua audiencia em tempo real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="letmeAsk" />
                   {!user && (
                        <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                   )}
                    {user && (
                        <button onClick={handleLoggoff} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        SignOut
                        </button>
                       
                    )}
                   
                    <div className="separator">ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                         type="text"
                         placeholder="Digite o codigo da sala"
                         onChange={event=>setRoomCode(event.target.value)}
                         value = {roomCode}
                         />
                         <Button type="submit" >
                             Entrar na sala
                         </Button>
                    </form>
                </div>
            </main>
           
        </div>
        
    )
}