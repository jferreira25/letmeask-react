import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Home(){
const history = useHistory();
    const { user, sigInWithGoogle} = useAuth();

   async function handleCreateRoom(){

       if(!user)
        await sigInWithGoogle();

        history.push('/rooms/new');
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala </div>
                    <form>
                        <input
                         type="text"
                         placeholder="Digite o codigo da sala"
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