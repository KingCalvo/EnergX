import { useState, useEffect } from "react";

import img1 from "../../assets/Energ-X-Login.png";
import img2 from "../../assets/Energ-X-Panel.png";
import img3 from "../../assets/Energ-X-Dispositivo.png";
import img4 from "../../assets/Energ-X-Areas.png";

export default function ImageApp() {
  const images = [img1.src, img2.src, img3.src, img4.src];

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = () => setIndex(index === 0 ? images.length - 1 : index - 1);

  const next = () => setIndex(index === images.length - 1 ? 0 : index + 1);

  useEffect(() => {
    if (!open) return;

    const handle = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handle);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handle);
      document.body.style.overflow = "";
    };
  }, [open, index]);

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden border bg-white shadow">
        <button
          onClick={() => setOpen(true)}
          className="w-full h-[400px] sm:h-[200px] lg:h-[490px]"
        >
          <img src={images[index]} className="w-full h-full object-cover" />
        </button>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 
             bg-white/90 backdrop-blur-md 
             p-3 rounded-full shadow-md 
             transition-all hover:scale-110 hover:bg-white"
        >
          <span className="text-lg font-bold">‹</span>
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 
             bg-white/90 backdrop-blur-md 
             p-3 rounded-full shadow-md 
             transition-all hover:scale-110 hover:bg-white"
        >
          <span className="text-lg font-bold">›</span>
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              className="w-full max-h-[60vh] object-contain mx-auto"
            />

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 
             bg-white/90 backdrop-blur-md 
             p-3 rounded-full shadow-md 
             transition-all hover:scale-110 hover:bg-white"
            >
              <span className="text-lg font-bold">‹</span>
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 
             bg-white/90 backdrop-blur-md 
             p-3 rounded-full shadow-md 
             transition-all hover:scale-110 hover:bg-white"
            >
              <span className="text-lg font-bold">›</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
