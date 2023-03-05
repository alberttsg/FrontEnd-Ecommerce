import { Navigate } from "react-router-dom";
import { Button, Result } from 'antd';


export const PageNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button href="/"  type="primary">Back Home</Button>}
  />
)

export const PrivateZone = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};
