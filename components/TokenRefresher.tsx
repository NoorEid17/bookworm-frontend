"use client"
import {ReactNode, useEffect, useContext} from 'react'
import axios from "axios"
import { AuthContext } from './AuthProvider'

const TokenRefresher = ({children}: {
    children: ReactNode
}) => {

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/token`, {method: "GET"})
            .then((res) => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }, [])

    const {state, dispatch} = useContext(AuthContext);
  return (
    <div>{children}</div>
  )
}

export default TokenRefresher