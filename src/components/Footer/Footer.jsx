const Footer = () => {
  return (
    <div className="footer">
      <span>{new Date().getFullYear()} &copy;</span>
      <a href="https://brianwebportal.netlify.app" target="_blank">
        {" "}
        Brian Wahinya{" "}
      </a>
    </div>
  );
};
export default Footer;
