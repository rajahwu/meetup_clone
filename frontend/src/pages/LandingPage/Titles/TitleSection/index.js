import TitleSectionCSS from "./TitleSection.module.css"

const LandingPageTitle = () => {
  const css = TitleSectionCSS

  return (
    <section className={css["container"]}>
      <div>
        <h1 className={css["title"]}>Title</h1>
        <p className={css["text"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          m{" "}
        </p>
      </div>
      <div>
        <img
          width="250"
          height="250"
          src="../../../assets/images/title-image.png"
          alt="title"
        />
      </div>
    </section>
  );
};

export default LandingPageTitle;
