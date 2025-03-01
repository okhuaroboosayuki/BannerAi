import { toPng } from "html-to-image";
import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * Custom hook to handle downloading the banner as an image.
 * @param {object} bannerRef - The banner reference
 * @param {string} name - The name of the user
 * @param {function} dispatchFn - The dispatch function
 * @returns {object} The handleDownload function
 */

const useDownload = (bannerRef, name, dispatchFn) => {
  const handleDownload = useCallback(() => {
    const bannerElement = bannerRef.current;
    if (!bannerElement) return;

    const newWidth = 967; // 967px is the width of the banner to be downloaded

    const originalWidth = bannerElement.offsetWidth; // original width of the banner

    bannerElement.style.width = `${newWidth}px`;

    dispatchFn({ type: "loading", payload: true });
    toast.loading("Downloading banner", { position: "top-center", autoClose: false });

    toPng(bannerElement, { cacheBust: true, quality: 1, width: newWidth, height: 300 })
      .then((dataUrl) => {
        const link = document.createElement("a");

        const firstName = name.split(" ")[0];
        const lastName = name.split(" ")[1];

        link.download = !lastName ? `${firstName}-banner.png` : `${firstName}-${lastName}-banner.png`;

        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        toast.error("An error occurred while downloading the banner", { position: "top-center" });
        console.error(error);
      })
      .finally(() => {
        toast.dismiss();
        dispatchFn({ type: "loading", payload: false });

        bannerElement.style.width = `${originalWidth}px`;
      });
  }, [dispatchFn, name, bannerRef]);

  return { handleDownload };
};

export default useDownload;
