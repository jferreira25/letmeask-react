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
import GenericModalDialog from '../components/ModalDialog/Modal.Dialog'
import { UseModalDialog } from '../hooks/useModalDialog'
import { useEffect } from 'react'
import useStyles from '../components/ModalDialog/style'
import { getUser } from '../services/mockon'


export function Home(){
    const history = useHistory();
    const { user, sigInWithGoogle,signOutWithGoogle} = useAuth();
    const [ roomCode, setRoomCode] = useState('');
    const [colorButton,setColorButton] = useState('');
    const {handleClickOpen,handleClose,open,modalValue} = UseModalDialog();
    const classes = useStyles({ hasBlock: colorButton })();
    
   async function handleCreateRoom(){
   
       if(!user)
        await sigInWithGoogle();

        history.push('/rooms/new');
    }

    useEffect(()=>{
        
        if(modalValue)
            ModalAllowed();
            // return ()=>{
            //     modalValue;
            //   }
    },[modalValue]);

    

    async  function ModalAllowed(){
        await signOutWithGoogle();
        }

    async function handleLoggoff(){
       //funcoes de state sao asyncronas para isso usar useEffect
        handleClickOpen();
           // await signOutWithGoogle();
    }
    function sendAxios(){
        getUser();
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
                    <div>
                    <Button type="submit" onClick={sendAxios}>
                             Entrar na sala
                         </Button>

                        defina cor do seu botão
                        <form>
                            <input
                            type="text"
                            placeholder="Digite a cor do botão"
                            onChange={event=>setColorButton(event.target.value)}
                            value = {colorButton}
                            />
                        </form>
                    </div>
                    <img src={logoImg} alt="letmeAsk" />
                    <button onClick={handleCreateRoom} className={classes.switch}>
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
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
           <GenericModalDialog
           open ={open}
           handleClickOpen ={handleClickOpen}
           handleClose ={handleClose}
           />
           
        </div>
        
    )
}