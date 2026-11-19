import ResetForm from "./ResetForm";
import Header from "../navigation/Header";
import Footer from "../navigation/Footer";

const ResetPassword = () => {
  return (
    <div className="page-container">
      <Header />

      {/* Main content */}
      <main className="main-content reset-main-content">
        {/* Your website content goes here */}
        <ResetForm />
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
