import { VscHome, VscAccount, VscSettingsGear } from "react-icons/vsc";

import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

import ShapeGrid from "./components/ShapeGrid";
import ClickSpark from "./components/ClickSpark";
import Dock from "./components/Dock";
import Lanyard from "./components/Lanyard";
import Stack from "./components/Stack";

const dockItems = [
  {
    icon: <VscHome size={18} />,
    label: "Home",
    onClick: () => {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    },
  },
  {
    icon: <FaLinkedin size={20} />,
    label: "LinkedIn",
    onClick: () => {
      window.open("https://www.linkedin.com/", "_blank", "noopener,noreferrer");
    },
  },
  {
    icon: <FaGithub size={20} />,
    label: "GitHub",
    onClick: () => {
      window.open("https://github.com/", "_blank", "noopener,noreferrer");
    },
  },
  {
    icon: <FaInstagram size={20} />,
    label: "Instagram",
    onClick: () => {
      window.open(
        "https://www.instagram.com/",
        "_blank",
        "noopener,noreferrer",
      );
    },
  },
  {
    icon: <VscAccount size={18} />,
    label: "Profile",
    onClick: () => {
      alert("Hi, I'm Habil!");
    },
  },
  {
    icon: <VscSettingsGear size={18} />,
    label: "Contact",
    onClick: () => {
      alert("You can contact me through email.");
    },
  },
];

const stackImages = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

function App() {
  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={14}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
    >
      {/*
        main jadi wadah scroll (h-screen + overflow-y-auto) dengan snap-y
        snap-mandatory, jadi tiap section berhenti pas satu layar penuh
        seperti "halaman" terpisah. Pakai overflow-y-auto (bukan
        overflow-hidden biasa di wadah luar) supaya scroll snap bekerja.
      */}
      <main className="relative h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-black text-white">
        {/* BACKGROUND SHAPE GRID */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <ShapeGrid
            speed={0.22}
            squareSize={40}
            direction="diagonal"
            borderColor="#505050"
            hoverFillColor="#222"
            shape="square"
            hoverTrailAmount={0}
          />
        </div>

        {/* LAPISAN GELAP */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-black/60" />

        {/* KONTEN WEBSITE */}
        <div className="relative z-10">
          {/* HALAMAN 1: HERO */}
          {/*
            Kolom kiri dibatasi lebarnya (maks 640px) dan kolom lanyard
            ditaruh tepat setelahnya.
            - Mau lebih dekat ke teks? Perkecil 640px, atau perbesar nilai
              negatif md:-ml-10 di div lanyard (contoh: md:-ml-16).
            - Mau lebih jauh? Perbesar 640px.
          */}
          <section
            id="home"
            className="mx-auto grid min-h-screen max-w-6xl snap-start items-start gap-0 px-6 pb-12 pt-16 md:grid-cols-[minmax(0,640px)_420px] md:justify-start md:px-12"
          >
            {/* TEKS SEBELAH KIRI */}
            <div className="pt-10">
              <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                Hi, I'm Habil 👋
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-300">
                Frontend Developer. I love designing websites and turning them
                into code. Slightly addicted to coffee, and not a fan of CSS.
              </p>
            </div>

            {/*
              LANYARD: kolom ini hanya penahan ruang (h-[560px]).
              Canvas lanyard-nya sendiri ditarik naik dengan md:-top-16
              (sama dengan pt-16 milik section) sehingga ujung atas tali
              menempel di tepi atas halaman, tepat di bawah address bar
              localhost, bukan terpotong di tengah halaman.
            */}
            <div className="relative z-20 h-[560px] md:-ml-10">
              <div className="flex h-full justify-center md:absolute md:-top-16 md:left-0 md:right-0 md:h-screen md:justify-start">
                <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
              </div>
            </div>
          </section>

          {/* HALAMAN 2: ABOUT (footer ada di dalamnya supaya scroll snap tidak tersangkut) */}
          <section
            id="about"
            className="mx-auto flex min-h-screen max-w-6xl snap-start flex-col px-6 md:px-12"
          >
            <div className="flex flex-1 items-center py-16">
              <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
                {/* STACK SEBELAH KIRI */}
                <div
                  className="relative z-30 shrink-0 select-none"
                  style={{ width: 208, height: 208 }}
                >
                  <Stack
                    randomRotation={false}
                    sensitivity={100}
                    sendToBackOnClick={true}
                    cards={stackImages.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`card-${i + 1}`}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      />
                    ))}
                    autoplay={false}
                    autoplayDelay={3000}
                    pauseOnHover={false}
                  />
                </div>

                {/* TEKS ABOUT SEBELAH KANAN */}
                <div>
                  <h2 className="mb-3 text-3xl font-bold md:text-4xl">About</h2>

                  <p className="max-w-3xl text-base leading-7 text-gray-300 md:text-lg">
                    Driven Associate's Degree (D3) graduate in Informatics
                    Engineering from Politeknik Negeri Batam with strong
                    hands-on expertise in full-stack web development and IT
                    infrastructure support. Proven experience in developing web
                    management systems, financial tracking platforms, and
                    inventory modules through real-world Project-Based Learning
                    (PBL) and internship programs. Eager to apply technical
                    skills and problem-solving abilities to contribute
                    effectively in an IT Support or Web Developer position.
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER (pb-28 supaya tidak tertutup dock) */}
            <footer className="pb-28 text-center text-sm text-gray-500">
              © 2026 Habil. Built with React and TypeScript.
            </footer>
          </section>
        </div>

        {/* DOCK */}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Dock
            items={dockItems}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </main>
    </ClickSpark>
  );
}

export default App;
