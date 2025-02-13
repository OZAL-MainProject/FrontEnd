import { Link } from "react-router-dom"

const AuthLink = ({to, children, isAuthenticated, className, unAuth}) => {
  if(isAuthenticated) {
    return <Link to={to} className={className}>{children}</Link>
  }
  return <div onClick={unAuth} className={className}>{children}</div>
}

export default AuthLink;