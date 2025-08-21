function OmikujiBox() {
  return (
    <>
      <section className="omikuji-box-wrapper" aria-label="籤筒">
        <div className="omikuji-box">
          <img
            src="/src/assets/images/omikuji_box.png"
            alt="御籤籤筒"
            className="omikuji-img"
            draggable="false"
          />
        </div>
      </section>
    </>
  );
}
export default OmikujiBox;
