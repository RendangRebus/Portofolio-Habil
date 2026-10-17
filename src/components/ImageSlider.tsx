import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type ImageSliderProps = {
  images: string[];
  alt: string;
  className?: string;
  /** Ditampilkan kalau tidak ada gambar yang bisa dimuat */
  fallback?: ReactNode;
};

/*
  Slider gambar sederhana:
  - tombol panah kiri/kanan, titik penunjuk, dan penghitung "1 / 3"
  - bisa digeser (swipe/drag) dan memakai tombol panah keyboard
  - gambar yang gagal dimuat otomatis dilewati
*/
export default function ImageSlider({
  images,
  alt,
  className = "",
  fallback = null,
}: ImageSliderProps) {
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const shown = images.filter((src) => !failed.has(src));
  const count = shown.length;

  // jaga index tetap valid kalau ada gambar yang gagal dimuat
  useEffect(() => {
    if (count > 0 && index > count - 1) setIndex(count - 1);
  }, [count, index]);

  const go = useCallback(
    (dir: number) => setIndex((i) => (count ? (i + dir + count) % count : 0)),
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (count === 0) return <>{fallback}</>;

  return (
    <div
      className={`relative select-none overflow-hidden ${className}`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const delta = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
      }}
      onPointerLeave={() => {
        startX.current = null;
      }}
    >
      {/* Jalur slide */}
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {shown.map((src, i) => (
          <div key={src} className="h-full w-full shrink-0">
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              draggable={false}
              onError={() => {
                if (import.meta.env.DEV) {
                  console.warn(`[Gambar tidak ditemukan] ${src}`);
                }
                setFailed((prev) => new Set(prev).add(src));
              }}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Panah */}
          <button
            type="button"
            aria-label="Gambar sebelumnya"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Gambar berikutnya"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Titik penunjuk */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {shown.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Ke gambar ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Penghitung */}
          <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
            {index + 1} / {count}
          </span>
        </>
      )}
    </div>
  );
}
