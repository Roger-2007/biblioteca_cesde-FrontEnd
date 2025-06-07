import { createContext , useContext , useEffect , useState } from "react"

export const AuthContext = createContext()

export default function AuthProvider({children}) {
  let [user , setUser] = useState(null)
  let [loading , setLoading] = useState(false)

  useEffect(()=>{
    let storedUser = JSON.parse(localStorage.getItem("userData"))
    if (storedUser){
       setUser(storedUser)
    }
   setLoading(false)
  },[])

function login(formUser){
  setUser(formUser)
  localStorage.setItem("userData",JSON.stringify(formUser))
}
function logout(){
  setUser(null)
  localStorage.removeItem("userData")
}

  return (
    <AuthContext.Provider value={{login , logout , user , loading}}>
        {children}
    </AuthContext.Provider>
  )
}


export function useAuth(){
  return useContext(AuthContext)
}
