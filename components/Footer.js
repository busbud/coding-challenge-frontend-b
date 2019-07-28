const Footer = () => (
  <React.Fragment>
    <footer className="wrapper">
      <img className="image" src="/static/footer.png" />
    </footer>
    <style jsx>{`
      .wrapper {
        margin-top: 120px;
      }
      .image {
        height: auto;
        max-width: 100%;
      }
    `}</style>
  </React.Fragment>
);

export default Footer;
