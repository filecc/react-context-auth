import { useEffect, useState } from "react";
import { checkLogin } from "./lib/utils/utils";
import Navbar from "./components/Navbar";

export default function Layout({children} : {children: JSX.Element}){
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
        const isUserLogged = async () => {
            const isUserLogged = await checkLogin()
            if(isUserLogged) setIsLogged(true)
            else setIsLogged(false)
          }
          
          isUserLogged()
    }, [])
    return (
        <>
        <Navbar isLogged={isLogged} />
        {children}
        </>
    )
}
