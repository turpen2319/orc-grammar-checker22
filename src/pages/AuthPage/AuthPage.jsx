import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import { useState } from "react"
export default function AuthPage({ setUser }) {
    const [signUpActive, setSignUpActive] = useState(true)
    return (
        <main className="flex-ctr-ctr flex-col">
            <h1>Grammar Vision</h1>
            {signUpActive
            ?
                <SignUpForm setUser={setUser} setSignUpActive={setSignUpActive}/>
            :
                <LoginForm setUser={setUser} setSignUpActive={setSignUpActive}/>
            }
        </main>
    )
}