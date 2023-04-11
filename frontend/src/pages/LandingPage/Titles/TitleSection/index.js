const LandingPageTitle = ({styleSheet, styleClassName }) => (
    <section className={styleSheet[styleClassName]}>
      <div>
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.{" "}
        </p>
      </div>
      <div>
        <img
          width="250"
          height="250"
          src="../../../assets/group_selfie.png"
          alt="title"
        />
      </div>
    </section>
  );

  export default LandingPageTitle
  