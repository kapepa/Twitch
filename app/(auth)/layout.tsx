import { FC, ReactNode } from "react";

interface AuthLayoutprops {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutprops> = (props) => {
  const { children } = props;
  
  return (
    <div 
      className="h-full flex items-center justify-center"
    >
      { children }
    </div>
  )
}

export default AuthLayout