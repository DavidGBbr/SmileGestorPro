import { APP_ROUTES } from "@/constants/app-routes";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isAuthenticated, push]);
  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
