import { FC, ReactNode } from "react";

interface AuthLayoutprops {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutprops> = (props) => {
  const { children } = props;
  
  return (
    <div 
      className="flex flex-col gap-y-4"
    >
      <nav
        className="p-1 w-full"
      >
        Nav
      </nav>
      { children }
    </div>
  )
}

export default AuthLayout