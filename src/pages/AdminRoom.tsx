import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'
import {useHistory, useParams} from 'react-router-dom'
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

type RoomParams ={
    id:string;
}

export function AdminRoom(){
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const[newQuestion, setNewQuestion] =  useState('');
    const {title, questions} = useRoom(roomId);
    const history = useHistory();

    async function handleSendQuestion(event:FormEvent){
        event.preventDefault();

        if(newQuestion.trim() ==='')
            return;

        if(!user)
            throw new Error('You must be logged in')
        
        const question ={
            content:newQuestion,
            author:{
                name:user.name,
                avatar:user.avatar
            },
            isHighLighted:false,
            isAnswered:false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    async function handleCheckQuestionAsAnswered(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true,
        });
    }

    async function handleHighlightQuestion(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted:true,
        });
    }

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm('Você tem certeza que deseja excluir essa pergunta?'))
          await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt:new Date(),
        });

        history.push('/');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                   <img src={logoImg} alt="Letmeask"/>
                   <div>
                    <RoomCode code={roomId}/>
                    <Button 
                    isOutlined
                    onClick={handleEndRoom}
                    >Encerrar Sala</Button>
                   </div>
                 
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&  <span> {questions.length} pergunta(s)</span>}
                   
                </div>
               
                <div className="question-list">
                {questions.map(question =>{
                    return (
                        <Question 
                            key={ question.id }
                            content={ question.content }
                            author={ question.author }
                            isAnswered={ question.isAnswered }
                            isHighLighted = { question.isHighLighted }
                        >
                        {!question.isAnswered && (
                            <>
                            <button
                            type="button"
                            onClick={()=>handleCheckQuestionAsAnswered(question.id)}
                            >
                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                            </button>
                            <button
                            type="button"
                            onClick={()=>handleHighlightQuestion(question.id)}
                            >
                                <img src={answerImg} alt="Dar destaque a pergunta" />
                            </button>
                            </>
                        )}
                            <button
                            type="button"
                            onClick={()=>handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover Pergunta" />
                            </button>
                        </Question>
                    )
                })}
                </div>
               
            </main>
        </div>
    );
}