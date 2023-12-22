const Footer: RC = () => {
  const currentData = new Date().getFullYear();

  return (
    <footer className="pf-footer">
      Copyright © {currentData} <span className="company-name"> Mega Electronic</span>.
    </footer>
  )
}

export default Footer;
