import { FC, ReactNode } from "react";
import { Logo } from "./_components/logo";

interface AuthLayoutprops {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutprops> = (props) => {
  const { children } = props;
  
  return (
    <div 
      className="h-full flex flex-col items-center justify-center space-y-6"
    >
      <Logo/>
      { children }
    </div>
  )
}

export default AuthLayout