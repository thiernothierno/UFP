import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const MemberLoginPage = () => {
  const { state } = useLocation();

  return (
    <div className="page-container">
      <Header />

      {/* Main content */}
      <main className="main-content login-main-content">
        {/* Show the confirmation passed from the successful password-reset flow. */}
        {state?.message && <p role="status">{state.message}</p>}
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
};

export default MemberLoginPage;
