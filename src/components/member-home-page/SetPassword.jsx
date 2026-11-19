import SetPasswordForm from "./SetPasswordForm";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const SetPassword = () => {
  return (
    <div className="page-container">
      <Header />

      {/* Main content */}
      <main className="main-content reset-main-content">
        {/* Your website content goes here */}
        <SetPasswordForm />
      </main>

      <Footer />
    </div>
  );
};

export default SetPassword;
