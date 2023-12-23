const Footer: RC = () => {
  const currentData = new Date().getFullYear();

  return (
    <footer className="pf-footer">
      Copyright © {currentData} <span className="company-name"> Mega Electronic</span> Created by <span className="dev-name">Dev.youssef</span>.
    </footer>
  )
}

export default Footer;
