import '../styles/auth.scss'
import {FormEvent} from 'react'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { database } from '../services/firebase'

export function NewRoom(){
    const { user} = useAuth();

    const [newRoom,setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();
      
        if(newRoom.trim() === '')
           return;
        
           //registro de dado para um banco de dados como se fosse referente a uma linha do banco de dados
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`);
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                         type="text"
                         placeholder="Nome da sala"
                         onChange ={event=>setNewRoom(event.target.value)}
                         value = {newRoom}
                         />
                         <Button type="submit" >
                             Criar  sala
                         </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}