import PropTypes from "prop-types";
import { Button, CreativeBanner, SimpleBanner } from "../../components";

const Modal = ({ name, email, image, profession, socialMedia, generatedOutput, bannerRef, isLoading, onViewModal, onDownload }) => {
  if (!image) {
    return (
      <div className="modal">
        <SimpleBanner name={name} email={email} profession={profession} socialMedia={socialMedia} generatedOutput={generatedOutput} ref={bannerRef} />

        <div className="justify-center gap-4 lg:gap-8 landscape:flex portrait:hidden sm:-mt-16 lg:mt-0">
          <Button type={"button"} text={"hide results"} className={"white-button"} onClick={onViewModal} />
          <Button type={"button"} text={"download banner"} className={"blue-button"} onClick={onDownload} isLoading={isLoading} disabled={isLoading} />
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="modal">
        <CreativeBanner name={name} email={email} profession={profession} socialMedia={socialMedia} generatedOutput={generatedOutput} image={image} ref={bannerRef} />

        <div className="justify-center gap-4 lg:gap-8 landscape:flex portrait:hidden sm:-mt-16 lg:mt-0">
          <Button type={"button"} text={"hide results"} className={"white-button"} onClick={onViewModal} />
          <Button type={"button"} text={"download banner"} className={"blue-button"} onClick={onDownload} isLoading={isLoading} disabled={isLoading} />
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  socialMedia: PropTypes.array.isRequired,
  generatedOutput: PropTypes.array.isRequired,
  bannerRef: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onViewModal: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default Modal;
