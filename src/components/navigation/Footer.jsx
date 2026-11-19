import "./footer.css";

const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();
  return (
    <footer className="footer">
      <p>© {year} UFP. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
