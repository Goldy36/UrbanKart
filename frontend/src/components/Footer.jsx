const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>UrbanKart</h3>
          <p>Buy and sell smarter with a modern e-commerce experience.</p>
        </div>
        <p>© {new Date().getFullYear()} UrbanKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
