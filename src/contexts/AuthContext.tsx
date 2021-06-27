import { createContext,ReactNode, useEffect, useState } from "react";
import { auth,firebase } from "../services/firebase";

type AuthContextType ={
    user:User | undefined;
    sigInWithGoogle:()=>Promise<void>;
    signOutWithGoogle:()=>Promise<void>;
    }
    
    type User ={
      id:string;
      name:string;
      avatar:string;
    }

    type AuthContextProviderProps ={
        children:ReactNode
    }
  
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props:AuthContextProviderProps){
    const [user, setUser] = useState<User>();

    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user=>{
        if(user){
          const { displayName, photoURL, uid}  = user;
  
          if(!displayName || !photoURL)
            throw new Error('Missing Information from Google Account');
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
      
      return ()=>{
        unsubscribe();
      }
    },[]);

    async function sigInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await  auth.signInWithPopup(provider);
     
          if(result.user){
  
            const { displayName, photoURL, uid}  = result.user;
  
            if(!displayName || !photoURL)
              throw new Error('Missing Information from Google Account');
  
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
        }
    
    }

    async function signOutWithGoogle(){
      if(user){
        await auth.signOut();
        setUser(undefined);
      }
    }

    return(
        <AuthContext.Provider value={{user,sigInWithGoogle,signOutWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    );
}