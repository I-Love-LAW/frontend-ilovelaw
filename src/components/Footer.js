import React from "react";

function FooterComponent() {
  return (
    <>
      <br />
      <br />
      <footer
        className="text-center text-lg-start footer-bottom footer"
        style={{ position: "absolute", width: "100%", height: "auto" }}
      >
        <div
          className="text-center text-dark p-3"
          style={{ backgroundColor: "rgb(231 239 255)" }}
        >
          © 2023 Copyright:
          <a href="https://mdbootstrap.com/" target="_blank" rel="noreferrer">
            I Love LAW
          </a>
        </div>
      </footer>
    </>
  );
}

export default FooterComponent;
