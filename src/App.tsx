import {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  VscHome,
  VscAccount,
  VscProject,
  VscTools,
  VscVscode,
} from "react-icons/vsc";
import { LuBot, LuNetwork, LuChevronRight, LuCheck } from "react-icons/lu";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import {
  FiDownload,
  FiExternalLink,
  FiMonitor,
  FiDollarSign,
  FiPackage,
  FiArrowRight,
  FiCheck,
  FiX,
  FiServer,
  FiCode,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiCodeigniter,
  SiDotnet,
  SiVite,
  SiGit,
  SiGithub,
  SiVercel,
  SiGnuemacs,
} from "react-icons/si";

import ShapeGrid from "./components/ShapeGrid";
import ClickSpark from "./components/ClickSpark";
import Dock from "./components/Dock";
import Lanyard from "./components/Lanyard";
import ProfileCard from "./components/ProfileCard";
import FoldText from "./components/FoldText";
import LogoLoop from "./components/LogoLoop";
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler";
import { AnimatedBeam } from "./components/ui/animated-beam";
import ImageSlider from "./components/ImageSlider";
import { Badge } from "./components/ui/badge";

const asset = (path: string) =>
  encodeURI(`${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`);

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}

  return "dark";
}

const accentText = "text-[#2185D5]";
const bodyText = "text-neutral-700 dark:text-gray-300";
const mutedText = "text-neutral-500 dark:text-gray-500";

const pill = (icon: React.ReactNode, label: string, color: string) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-900/20 bg-neutral-900/[0.03] px-5 py-2.5 text-sm text-neutral-900 dark:border-white/25 dark:bg-white/[0.03] dark:text-white">
    <span className="text-lg" style={{ color }}>
      {icon}
    </span>
    {label}
  </span>
);

const heroStack: { name: string; icon: React.ElementType; color: string }[] = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "CodeIgniter", icon: SiCodeigniter, color: "#EE4623" },
  { name: "ASP.NET MVC", icon: SiDotnet, color: "#8B6AE6" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
];

const stats = [
  { value: "8", label: "Bulan magang" },
  { value: "3", label: "Proyek selesai" },
  { value: "3", label: "Sertifikat" },
];

type EntryKind = "project" | "certificate" | "experience";

type Entry = {
  kind: EntryKind;
  title: string;

  subtitle?: string;

  category: string;

  year: string;

  description: string;

  details: string;

  features: string[];

  tags: string[];
  icon: React.ReactNode;

  gradient: string;

  image?: string;

  images?: string[];
  github?: string;
  demo?: string;

  credential?: string;

  website?: string;
};

const entries: Entry[] = [
  {
    kind: "project",
    title: "E-Faktur Versi Edukasi",
    category: "Perpajakan",
    year: "2025",
    description:
      "Aplikasi e-Faktur untuk latihan perpajakan di Tax Center Politeknik Negeri Batam: rekam, ubah, dan cetak faktur pajak keluaran maupun masukan.",
    details:
      "E-Faktur Versi Edukasi adalah aplikasi web untuk Tax Center Politeknik Negeri Batam yang dipakai sebagai sarana latihan administrasi pajak. Dibangun lewat Project-Based Learning (PBL IF-26), aplikasi ini mengelola faktur pajak keluaran dan masukan beserta returnya, dokumen lain, SPT, data referensi, dan manajemen unggahan, dengan akses berdasarkan peran pengguna.",
    features: [
      "Rekam faktur pajak keluaran dan masukan",
      "Retur pajak keluaran dan masukan",
      "Tabel faktur: NPWP, nomor, masa, DPP, PPN, PPnBM, dan status approval",
      "Edit, hapus, unggah, pratinjau, dan cetak faktur",
      "Menu SPT, dokumen lain, referensi, dan manajemen unggahan",
    ],
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    icon: <FiMonitor size={44} />,
    gradient: "from-[#2185D5]/40 via-[#2185D5]/10 to-transparent",
    images: [
      asset("/projects/efaktur-1.png"),
      asset("/projects/efaktur-2.png"),
      asset("/projects/efaktur-3.png"),
    ],
    github: "https://github.com/gilangbagus-rama/faktur-main",
    demo: "#",
  },
  {
    kind: "project",
    title: "ID Project – Layanan Konstruksi & Booking",
    category: "Konstruksi",
    year: "2025",
    description:
      "Website dan sistem untuk PT. Kagungan Jaya Sukses: pemesanan layanan konstruksi, pencatatan keuangan, dan pelacakan inventaris.",
    details:
      "ID Project adalah platform web untuk PT. Kagungan Jaya Sukses (ID Project – One Stop Service, Batam) yang menggabungkan profil perusahaan, pemesanan layanan konstruksi, pengelolaan keuangan, dan pelacakan inventaris. Pengunjung bisa melihat layanan seperti interior dan eksterior, renovasi, sipil, lanskap, desain, dan elektrikal, berkonsultasi lewat WhatsApp, lalu masuk atau mendaftar untuk memesan. Tersedia dalam bahasa Indonesia dan Inggris.",
    features: [
      "Halaman profil, layanan, blog, dan portofolio perusahaan",
      "Login, registrasi, dan pemesanan layanan konstruksi",
      "Pengelolaan keuangan dan pelacakan inventaris",
      "Dua bahasa: Indonesia dan Inggris",
      "Tombol konsultasi gratis via WhatsApp",
    ],
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    icon: <FiDollarSign size={44} />,
    gradient: "from-neutral-400/40 via-neutral-400/10 to-transparent",
    images: [
      asset("/projects/idproject_1.png"),
      asset("/projects/idproject_2.png"),
      asset("/projects/idproject_3.png"),
    ],
    github: "https://github.com/Arfaaniq/IDPROJECT",
    demo: "#",
  },
  {
    kind: "project",
    title: "WMS Duta Dimensi – Manajemen Gudang",
    category: "Inventory",
    year: "2026",
    description:
      "Modul pengelolaan stok barang: barang masuk dan keluar, peringatan stok menipis, dan laporan inventaris yang bisa diekspor.",
    details:
      "WMS Duta Dimensi adalah aplikasi manajemen gudang untuk mencatat dan memantau material dari masuk sampai diproses. Fitur utamanya: kartu stok per jenis material (besi, aluminium, stainless steel, tembaga, plastik), manajemen rak dengan status kapasitas (kosong, terisi, penuh, tidak aktif), pemindaian barcode, serta formulir stock card, incoming, part list inventory, dan material transfer. Dilengkapi dashboard dengan grafik dan daftar PO, manajemen pengguna dan role, mode gelap/terang, dan dua bahasa.",
    features: [
      "Pencatatan incoming dan process material",
      "Kartu stok per material dengan detail dan formulir",
      "Manajemen rak: kode, area, kapasitas, dan status",
      "Scan barcode untuk rak dan material",
      "Manajemen pengguna dan role",
    ],
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    icon: <FiPackage size={44} />,
    images: [
      asset("/projects/WMS-DutaDimensi-1.png"),
      asset("/projects/WMS-DutaDimensi-2.png"),
      asset("/projects/WMS-DutaDimensi-3.png"),
    ],
    gradient: "from-slate-500/40 via-slate-500/10 to-transparent",
    github: "https://github.com/RendangRebus/TA-Duta-Dimensi",
  },

  {
    kind: "certificate",
    title: "Sertifikat Magang",
    subtitle: "PT. Duta Dimensi",
    category: "Magang",
    year: "2025 – 2026",
    description:
      "Sertifikat penyelesaian magang di PT. Duta Dimensi dengan predikat baik, sebagai IT Support & Systems Administrator Intern.",
    details:
      "Diberikan oleh PT. Duta Dimensi atas pelaksanaan magang sejak 11 Agustus 2025 sampai 10 April 2026 dengan baik. Selama magang, saya merawat perangkat keras, perangkat lunak, dan jaringan lokal, menangani troubleshooting pengguna, serta menyusun dokumentasi sistem.",
    features: [
      "Pemeliharaan hardware, software, dan jaringan lokal",
      "Troubleshooting konektivitas jaringan dan sistem untuk pengguna",
      "Penyusunan dokumentasi sistem dan alur operasional",
    ],
    tags: ["Jaringan", "Troubleshooting"],
    icon: <FiAward size={40} />,
    gradient: "from-[#2185D5]/30 via-[#2185D5]/5 to-transparent",
    images: [asset("/certificates/sertifikat-magang-duta-dimensi.jpeg")],
  },
  {
    kind: "certificate",
    title: "Sertifikat Project Based Learning (PBL)",
    subtitle: "Politeknik Negeri Batam · Diktisaintek Berdampak",
    category: "PBL",
    year: "2025",
    description:
      "Certificate of Completion PBL TA 2024/2025 Genap atas proyek aplikasi pengelolaan laporan keuangan, inventory, dan pemesanan jasa konstruksi untuk PT. Kagungan Jaya Sukses (TDA).",
    details:
      'Sertifikat penyelesaian Project Based Learning TA 2024/2025 Genap dari Politeknik Negeri Batam. Proyeknya berjudul "TDA1: Aplikasi Pengelolaan Laporan Keuangan, Mengatur Inventory dan Design Animasi", yaitu aplikasi pemesanan jasa konstruksi dan desain bangunan untuk PT. Kagungan Jaya Sukses (TDA).',
    features: [
      "Aplikasi pengelolaan laporan keuangan",
      "Pengaturan dan pelacakan inventory",
      "Pemesanan jasa konstruksi dan desain bangunan",
    ],
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    icon: <FiAward size={40} />,
    gradient: "from-neutral-400/30 via-neutral-400/5 to-transparent",
    images: [asset("/certificates/sertifikat-pbl-tda.png")],
  },
  {
    kind: "certificate",
    title: "Sertifikat Project Based Learning (PBL)",
    subtitle: "Politeknik Negeri Batam · Diktisaintek Berdampak",
    category: "PBL",
    year: "2024",
    description:
      "Certificate of Completion PBL TA 2024/2025 Ganjil atas proyek Pengembangan Aplikasi E-Faktur Versi Edukasi.",
    details:
      'Sertifikat penyelesaian Project Based Learning TA 2024/2025 Ganjil dari Politeknik Negeri Batam. Proyeknya berjudul "Pengembangan Aplikasi EFaktur versi Edukasi", yaitu aplikasi e-Faktur untuk latihan perpajakan di Tax Center Politeknik Negeri Batam.',
    features: [
      "Rekam dan kelola faktur pajak keluaran dan masukan",
      "Perancangan database dan fitur inti aplikasi",
      "Pengembangan aplikasi berbasis web secara tim",
    ],
    tags: ["Laravel", "Tailwind CSS", "MySQL"],
    icon: <FiAward size={40} />,
    gradient: "from-slate-500/30 via-slate-500/5 to-transparent",
    images: [asset("/certificates/sertifikat-pbl-efaktur.png")],
  },
];

const kindMeta: Record<
  EntryKind,
  {
    label: string;
    icon: React.ElementType;

    bg?: string;
    featuresTitle: string;
    tagsTitle: string;
  }
> = {
  project: {
    label: "Project",
    icon: FiCode,
    bg: "#2185D5",
    featuresTitle: "Fitur utama",
    tagsTitle: "Teknologi",
  },
  certificate: {
    label: "Sertifikat",
    icon: FiAward,
    featuresTitle: "Yang dipelajari",
    tagsTitle: "Topik",
  },
  experience: {
    label: "Pengalaman",
    icon: FiBriefcase,
    bg: "#525252",
    featuresTitle: "Tanggung jawab & pencapaian",
    tagsTitle: "Teknologi",
  },
};

function KindBadge({
  kind,
  className = "",
}: {
  kind: EntryKind;
  className?: string;
}) {
  const meta = kindMeta[kind];
  const Icon = meta.icon;
  return (
    <Badge
      className={className}
      style={meta.bg ? { backgroundColor: meta.bg, color: "#fff" } : undefined}
    >
      <Icon />
      {meta.label}
    </Badge>
  );
}

function entryLinks(entry: Entry) {
  const links: {
    label: string;
    modalLabel: string;
    href: string;
    code: boolean;
    icon: React.ElementType;
  }[] = [];
  if (entry.github)
    links.push({
      label: "Kode",
      modalLabel: "Lihat kode",
      href: entry.github,
      code: true,
      icon: FaGithub,
    });
  if (entry.demo)
    links.push({
      label: "Demo",
      modalLabel: "Lihat demo",
      href: entry.demo,
      code: false,
      icon: FiExternalLink,
    });
  if (entry.credential)
    links.push({
      label: "Sertifikat",
      modalLabel: "Lihat sertifikat",
      href: entry.credential,
      code: false,
      icon: FiExternalLink,
    });
  if (entry.website)
    links.push({
      label: "Website",
      modalLabel: "Kunjungi website",
      href: entry.website,
      code: false,
      icon: FiExternalLink,
    });
  return links;
}

const techIcons: Record<string, { icon: React.ElementType; color?: string }> = {
  react: { icon: SiReact, color: "#61DAFB" },
  "react.js": { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs },
  "node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  express: { icon: SiExpress },
  postgresql: { icon: SiPostgresql, color: "#4A90C2" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  "tailwind css": { icon: SiTailwindcss, color: "#38BDF8" },
  php: { icon: SiPhp, color: "#777BB4" },
  laravel: { icon: SiLaravel, color: "#FF2D20" },
  codeigniter: { icon: SiCodeigniter, color: "#EE4623" },
  "asp.net mvc": { icon: SiDotnet, color: "#8B6AE6" },
  "asp.net": { icon: SiDotnet, color: "#8B6AE6" },
  vite: { icon: SiVite, color: "#A78BFA" },
  "rest api": { icon: FiServer },
};

function TechBadge({ tag }: { tag: string }) {
  const entry = techIcons[tag.toLowerCase()];
  const Icon = entry?.icon ?? FiCode;
  return (
    <Badge variant="outline" className="h-6 gap-1.5 px-2.5">
      <Icon style={entry?.color ? { color: entry.color } : undefined} />
      {tag}
    </Badge>
  );
}

function Thumbnail({
  entry,
  className = "",
}: {
  entry: Entry;
  className?: string;
}) {
  const src = entry.image ?? entry.images?.[0];
  const [broken, setBroken] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${entry.gradient} ${className}`}
    >
      {src && !broken ? (
        <img
          src={src}
          alt={entry.title}
          loading="lazy"
          onError={() => {
            if (import.meta.env.DEV) {
              console.warn(`[Gambar tidak ditemukan] ${src}`);
            }
            setBroken(true);
          }}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
            entry.kind === "certificate"
              ? "object-contain"
              : "object-cover object-top"
          }`}
        />
      ) : (
        <span className="text-neutral-800/70 transition-transform duration-500 group-hover:scale-110 dark:text-white/70">
          {entry.icon}
        </span>
      )}
    </div>
  );
}

function EntryCard({ entry, onOpen }: { entry: Entry; onOpen: () => void }) {
  const links = entryLinks(entry);
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Lihat detail ${entry.title}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2185D5]/60 hover:shadow-xl hover:shadow-[#2185D5]/10 focus-visible:ring-2 focus-visible:ring-[#2185D5] dark:border-white/10 dark:bg-[#141416]/90 dark:hover:border-[#2185D5]/60"
    >
      <div className="relative">
        <Thumbnail
          entry={entry}
          className={entry.kind === "experience" ? "h-32" : "h-44"}
        />
        <KindBadge kind={entry.kind} className="absolute left-4 top-4" />
        <Badge variant="secondary" className="absolute right-4 top-4">
          {entry.year}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{entry.title}</h3>
        {entry.subtitle && (
          <p className="mt-1 text-sm font-medium text-[#2185D5]">
            {entry.subtitle}
          </p>
        )}

        <p className={`mt-2 flex-1 text-sm leading-6 ${bodyText}`}>
          {entry.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <Badge variant="secondary" className="h-6 px-2.5">
              {entry.category}
            </Badge>
          </li>
          {entry.tags.map((tag) => (
            <li key={tag}>
              <TechBadge tag={tag} />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-4 text-sm font-medium dark:border-white/10">
          <div className="flex items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 transition-colors hover:text-[#2185D5]"
              >
                <link.icon size={16} />
                {link.label}
              </a>
            ))}
          </div>

          <span
            className={`ml-auto inline-flex items-center gap-1.5 ${accentText} transition-transform group-hover:translate-x-0.5`}
          >
            Detail
            <FiArrowRight size={15} />
          </span>
        </div>
      </div>
    </article>
  );
}

function EntryModal({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const meta = kindMeta[entry.kind];
  const links = entryLinks(entry);
  const primaryIndex = links.findIndex((l) => !l.code);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const main = document.querySelector("main") as HTMLElement | null;
    const prevOverflow = main?.style.overflowY ?? "";
    if (main) main.style.overflowY = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      if (main) main.style.overflowY = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={entry.title}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 dark:border-white/10 dark:bg-[#141416] dark:text-white"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          <FiX size={18} />
        </button>

        <ImageSlider
          images={entry.images ?? []}
          alt={entry.title}
          className={`aspect-video w-full bg-gradient-to-br ${entry.gradient}`}
          fallback={<Thumbnail entry={entry} className="h-56" />}
        />

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <KindBadge kind={entry.kind} />
            <Badge variant="secondary">{entry.category}</Badge>
            <Badge variant="outline">{entry.year}</Badge>
          </div>

          <h3 className="mt-3 text-2xl font-bold md:text-3xl">{entry.title}</h3>
          {entry.subtitle && (
            <p className="mt-1 text-sm font-medium text-[#2185D5]">
              {entry.subtitle}
            </p>
          )}

          <p className={`mt-3 leading-7 ${bodyText}`}>{entry.details}</p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-gray-400">
            {meta.featuresTitle}
          </h4>
          <ul className="mt-3 space-y-2">
            {entry.features.map((feature) => (
              <li
                key={feature}
                className={`flex items-start gap-2.5 text-sm ${bodyText}`}
              >
                <FiCheck size={16} className="mt-0.5 shrink-0 text-[#2185D5]" />
                {feature}
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-gray-400">
            {meta.tagsTitle}
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <TechBadge key={tag} tag={tag} />
            ))}
          </div>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    i === primaryIndex
                      ? "inline-flex items-center gap-2 rounded-full bg-[#2185D5] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1b6fb3]"
                      : "inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:border-white/15 dark:hover:bg-white/10"
                  }
                >
                  <link.icon size={16} />
                  {link.modalLabel}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SkillTool = {
  name: string;
  group: string;
  icon: React.ElementType;
  color: string;
  accent: string;
};

function CanvaIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="canva-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#canva-grad)" />
      <path
        d="M15.6 8.9a4.4 4.4 0 1 0 0 6.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

const skillTools: SkillTool[] = [
  {
    name: "MySQL",
    group: "Database",
    icon: SiMysql,
    color: "#00758f",
    accent: "#d9f4fa",
  },
  {
    name: "Laravel",
    group: "Backend",
    icon: SiLaravel,
    color: "#ff2d20",
    accent: "#ffe1de",
  },
  {
    name: "PHP",
    group: "Backend",
    icon: SiPhp,
    color: "#777bb4",
    accent: "#e7e8f8",
  },
  {
    name: "CodeIgniter",
    group: "Backend",
    icon: SiCodeigniter,
    color: "#ee4623",
    accent: "#ffe3dc",
  },
  {
    name: "ASP.NET MVC",
    group: "Backend",
    icon: SiDotnet,
    color: "#512BD4",
    accent: "#ece6fb",
  },
  {
    name: "Git",
    group: "Tools",
    icon: SiGit,
    color: "#F05032",
    accent: "#ffe5df",
  },
  {
    name: "GitHub",
    group: "Tools",
    icon: SiGithub,
    color: "#181717",
    accent: "#e8e8e8",
  },
  {
    name: "Vercel",
    group: "Tools",
    icon: SiVercel,
    color: "#000000",
    accent: "#e8e8e8",
  },

  {
    name: "React.js",
    group: "Frontend",
    icon: SiReact,
    color: "#087ea4",
    accent: "#d9f5ff",
  },
  {
    name: "TypeScript",
    group: "Frontend",
    icon: SiTypescript,
    color: "#3178c6",
    accent: "#dcecff",
  },
  {
    name: "JavaScript",
    group: "Frontend",
    icon: SiJavascript,
    color: "#b08a00",
    accent: "#fff4bf",
  },
  {
    name: "Tailwind CSS",
    group: "Styling",
    icon: SiTailwindcss,
    color: "#0ea5e9",
    accent: "#d9f5ff",
  },
  {
    name: "VS Code",
    group: "Tools",
    icon: VscVscode,
    color: "#23A9F2",
    accent: "#dcf1fd",
  },
  {
    name: "Emacs",
    group: "Tools",
    icon: SiGnuemacs,
    color: "#7F5AB6",
    accent: "#ece6f6",
  },
  {
    name: "Canva",
    group: "Tools",
    icon: CanvaIcon,
    color: "#00C4CC",
    accent: "#d9f8f9",
  },
];

const skillTags = [
  "Frontend systems",
  "Backend architecture",
  "Database design",
  "Responsive interfaces",
];

const skillFilters = [
  "All tools",
  "Frontend",
  "Backend",
  "Database",
  "Styling",
  "Tools",
];

const CORE_IMAGE: string | null = asset("/avatar.png");
const CORE_LABEL = "Core intelligence";

function SkillsSection({ isDark }: { isDark: boolean }) {
  const [group, setGroup] = useState("All tools");
  const [selected, setSelected] = useState<string | null>(null);

  const isActive = (tool: SkillTool) =>
    (group === "All tools" || tool.group === group) &&
    (!selected || tool.name === selected);

  const visibleTools = useMemo(
    () =>
      skillTools.filter(
        (tool) =>
          (group === "All tools" || tool.group === group) &&
          (!selected || tool.name === selected),
      ),
    [group, selected],
  );

  const boxHeight = Math.max(
    460,
    (Math.ceil(skillTools.length / 2) - 1) * 100 + 126,
  );
  const [coreImgFailed, setCoreImgFailed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const toolRefs = useMemo(
    () => skillTools.map(() => createRef<HTMLSpanElement>()),
    [],
  );

  const nodes = useMemo(() => {
    const half = Math.ceil(skillTools.length / 2);
    const place = (list: SkillTool[], side: "left" | "right") =>
      list.map((tool, i) => ({
        tool,
        side,
        topPct:
          list.length === 1
            ? 50
            : boxHeight > 460
              ? ((50 + i * ((boxHeight - 126) / (list.length - 1))) /
                  boxHeight) *
                100
              : 18 + i * (64 / (list.length - 1)),
        leftPct: side === "left" ? 17 : 83,
        index: skillTools.indexOf(tool),
      }));
    return [
      ...place(skillTools.slice(0, half), "left"),
      ...place(skillTools.slice(half), "right"),
    ];
  }, [boxHeight]);

  const toggleTool = (name: string) =>
    setSelected((prev) => (prev === name ? null : name));

  return (
    <section
      id="skills"
      className="mx-auto flex min-h-screen max-w-6xl snap-start flex-col px-4 md:px-8"
    >
      <div className="flex-1 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p
              className={`mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] ${accentText}`}
            >
              <span className="size-1.5 rounded-full bg-[#2185D5]" />
              Technical skills
            </p>
            <h2 className="max-w-xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Skills that
              <br />
              <span className="text-neutral-400 dark:text-white/35">
                connect.
              </span>
            </h2>
          </div>

          <div className="flex max-w-lg flex-col gap-6 lg:ml-auto">
            <p className={`text-lg leading-relaxed ${bodyText}`}>
              A practical toolkit for turning complex ideas into calm, useful
              digital systems.
            </p>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-300 bg-neutral-900/[0.03] px-3 py-2 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{ minHeight: boxHeight }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white/80 dark:border-white/10 dark:bg-[#0c0e11]/90"
        >
          <div className="absolute inset-0 opacity-60 [--grid:rgba(0,0,0,.06)] [background-image:linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-40 dark:[--grid:rgba(255,255,255,.05)]" />
          <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2185D5]/15 blur-3xl" />

          {nodes.map(({ tool, side, index }) => (
            <AnimatedBeam
              key={tool.name}
              containerRef={containerRef}
              fromRef={toolRefs[index]}
              toRef={coreRef}
              reverse={side === "right"}
              duration={3.2}
              delay={index * 0.35}
              pathColor={isDark ? "#ffffff" : "#000000"}
              pathOpacity={isDark ? 0.12 : 0.15}
              pathWidth={2}
              gradientStartColor="#2185D5"
              gradientStopColor="#6FB5EE"
              className={`transition-opacity duration-300 ${
                isActive(tool) ? "opacity-100" : "opacity-20"
              }`}
            />
          ))}

          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: boxHeight }}
          >
            <div
              ref={coreRef}
              className="relative z-10 flex size-32 items-center justify-center rounded-full border border-[#2185D5]/50 bg-white shadow-[0_0_80px_rgba(33,133,213,.2)] dark:bg-[#0d1620]"
            >
              {CORE_IMAGE && !coreImgFailed ? (
                <img
                  src={CORE_IMAGE}
                  alt={CORE_LABEL}
                  onError={() => setCoreImgFailed(true)}
                  draggable={false}
                  className="absolute left-1.5 top-1.5 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] select-none rounded-full object-cover object-[center_25%]"
                />
              ) : (
                <>
                  <div className="absolute inset-3 rounded-full border border-[#2185D5]/20" />
                  <LuBot className="size-12 text-[#2185D5]" strokeWidth={1.2} />
                </>
              )}
              <span className="absolute -bottom-8 whitespace-nowrap text-[10px] uppercase tracking-[0.26em] text-neutral-500 dark:text-white/45">
                {CORE_LABEL}
              </span>
            </div>

            {nodes.map(({ tool, topPct, leftPct, index }) => {
              const Icon = tool.icon;
              const active = isActive(tool);
              return (
                <button
                  key={tool.name}
                  type="button"
                  onClick={() => toggleTool(tool.name)}
                  aria-label={`Tampilkan ${tool.name}`}
                  aria-pressed={selected === tool.name}
                  className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-30"
                  }`}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                >
                  <span
                    ref={toolRefs[index]}
                    className={`mx-auto flex size-14 items-center justify-center rounded-2xl border bg-white shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:border-[#2185D5] ${
                      selected === tool.name
                        ? "border-[#2185D5] ring-2 ring-[#2185D5]/50"
                        : "border-neutral-200 dark:border-white/10"
                    }`}
                    style={{ color: tool.color }}
                  >
                    <Icon className="size-7" />
                  </span>
                  <span className="mt-2 block whitespace-nowrap text-[11px] text-neutral-600 transition group-hover:text-neutral-900 dark:text-white/60 dark:group-hover:text-white">
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-white/30">
            <LuNetwork className="size-3.5" /> Connected ecosystem
          </div>
        </div>

        <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-white/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-white/35">
                Explore the stack
              </p>
              <h3 className="mt-2 text-2xl tracking-tight">
                Tools &amp; technologies
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setGroup(filter);
                    setSelected(null);
                  }}
                  className={`rounded-full px-3 py-2 text-xs transition ${
                    group === filter
                      ? "bg-[#2185D5] text-white"
                      : "border border-neutral-300 text-neutral-500 hover:text-neutral-900 dark:border-white/10 dark:text-white/50 dark:hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTools.map((tool) => (
              <button
                key={tool.name}
                type="button"
                onClick={() => toggleTool(tool.name)}
                className={`flex items-center justify-between rounded-2xl border bg-white/70 p-4 text-left transition hover:-translate-y-0.5 dark:bg-white/[0.025] ${
                  selected === tool.name
                    ? "border-[#2185D5]"
                    : "border-neutral-200 hover:border-neutral-400 dark:border-white/10 dark:hover:border-white/25 dark:hover:bg-white/[0.05]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: tool.accent, color: tool.color }}
                  >
                    <tool.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm">{tool.name}</span>
                    <span className="block text-xs text-neutral-500 dark:text-white/35">
                      {tool.group}
                    </span>
                  </span>
                </span>
                <LuChevronRight className="size-4 text-neutral-400 dark:text-white/25" />
              </button>
            ))}
            {!visibleTools.length && (
              <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 py-10 text-center text-sm text-neutral-500 dark:border-white/15 dark:text-white/40">
                No tools found.
              </div>
            )}
          </div>
        </div>
      </div>

      <footer
        className={`flex flex-col gap-3 pb-28 text-sm sm:flex-row sm:items-center sm:justify-between ${mutedText}`}
      >
        <span>© 2026 Habil. Built with React and TypeScript.</span>
        <span className="flex items-center gap-2">
          <LuCheck className="size-3.5 text-[#2185D5]" /> Always learning,
          always connecting
        </span>
      </footer>
    </section>
  );
}

const typedWords = [
  "fresh graduate",
  "Junior Developer",
  "scalable",
  "end-to-end",
];

function useTypewriter(words: string[], speed = 110, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && text === word) delay = pause;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

function App() {
  const typed = useTypewriter(typedWords);

  const [selected, setSelected] = useState<Entry | null>(null);
  const [kindFilter, setKindFilter] = useState<"all" | EntryKind>("all");
  const visibleEntries = useMemo(
    () =>
      kindFilter === "all"
        ? entries
        : entries.filter((e) => e.kind === kindFilter),
    [kindFilter],
  );
  const closeProject = useCallback(() => setSelected(null), []);

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isDark = theme === "dark";

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme, isDark]);

  const techLogos = useMemo(
    () =>
      heroStack.map((tech) => ({
        node: pill(<tech.icon />, tech.name, tech.color),
        title: tech.name,
      })),
    [],
  );

  const dockItems = useMemo(
    () => [
      {
        icon: <VscHome size={18} />,
        label: "Home",
        onClick: () =>
          document
            .getElementById("home")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        icon: <VscAccount size={18} />,
        label: "About",
        onClick: () =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        icon: <VscProject size={18} />,
        label: "Projects",
        onClick: () =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        icon: <VscTools size={18} />,
        label: "Skills",
        onClick: () =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        icon: <FaGithub size={20} />,
        label: "GitHub",
        onClick: () =>
          window.open(
            "https://github.com/RendangRebus",
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        icon: <FaLinkedin size={20} />,
        label: "LinkedIn",
        onClick: () =>
          window.open(
            "https://www.linkedin.com/in/habil-mushani/",
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        icon: <FaInstagram size={20} />,
        label: "Instagram",
        onClick: () =>
          window.open(
            "https://www.instagram.com/",
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        icon: <MdOutlineMail size={20} />,
        label: "Email",
        onClick: () => {
          window.location.href = "mailto:habilmushani0102@gmail.com";
        },
      },
      {
        icon: (
          <AnimatedThemeToggler
            id="theme-toggle"
            variant="circle"
            duration={500}
            theme={theme}
            onThemeChange={setTheme}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none flex items-center justify-center"
          />
        ),
        label: isDark ? "Mode terang" : "Mode gelap",
        onClick: () => document.getElementById("theme-toggle")?.click(),
      },
    ],
    [theme, isDark],
  );

  return (
    <ClickSpark
      sparkColor={isDark ? "#ffffff" : "#171717"}
      sparkSize={14}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
    >
      <main className="relative h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white">
        <div className="pointer-events-none fixed inset-0 z-0">
          <ShapeGrid
            speed={0.22}
            squareSize={40}
            direction="diagonal"
            borderColor={isDark ? "#505050" : "#d4d4d8"}
            hoverFillColor={isDark ? "#222" : "#e4e4e7"}
            vignetteColor={isDark ? "#000000" : "#fafafa"}
            shape="square"
            hoverTrailAmount={0}
          />
        </div>

        <div className="pointer-events-none fixed inset-0 z-0 bg-white/60 dark:bg-black/60" />

        <div className="relative z-10">
          <section
            id="home"
            className="mx-auto grid min-h-screen max-w-7xl snap-start items-start gap-0 px-6 pb-40 pt-16 md:grid-cols-[minmax(0,760px)_420px] md:justify-start md:px-12"
          >
            <div className="pt-10 md:pt-12">
              <div
                className={`flex items-center gap-2 font-mono text-sm tracking-[0.2em] ${mutedText}`}
              >
                <span className="text-[10px]">▶</span>
                <span>AVAILABLE FOR WORK</span>
              </div>

              <h1 className="mt-3 text-5xl font-bold leading-tight md:text-6xl">
                Hi, I'm Habil <span className="inline-block">👋</span>
              </h1>

              <div
                className="mt-4 leading-[0.9]"
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontStretch: "125%",
                }}
              >
                <FoldText
                  text="Full Stack"
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.65}
                  stagger={0.045}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.55}
                  fontSize={92}
                  fontWeight={900}
                  color={isDark ? "#f4f4f4" : "#171717"}
                />
                <FoldText
                  text="Developer"
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.65}
                  stagger={0.045}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.55}
                  fontSize={92}
                  fontWeight={900}
                  color={isDark ? "#8a8a8a" : "#737373"}
                />
              </div>

              <p className="mt-6 font-mono text-lg">
                {typed}
                <span className="animate-pulse"> _</span>
              </p>

              <p
                className={`mt-4 max-w-xl text-lg leading-relaxed ${
                  isDark ? "text-gray-200" : "text-neutral-700"
                }`}
              >
                Membangun aplikasi web end-to-end, dari antarmuka yang
                interaktif hingga sistem backend yang scalable dan terintegrasi.
              </p>

              <div
                className="mt-10 max-w-[720px]"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                }}
              >
                <LogoLoop
                  logos={techLogos}
                  speed={40}
                  direction="left"
                  logoHeight={44}
                  gap={16}
                  hoverSpeed={0}
                  fadeOut={false}
                  ariaLabel="Tech stack"
                />
              </div>

              <div
                className={`mt-16 space-y-1 font-mono text-base ${mutedText}`}
              >
                <p>↓ explore my work below</p>
                <p>/ open to full-time &amp; freelance opportunities</p>
              </div>
            </div>

            <div className="relative z-20 flex justify-center pt-10 md:ml-10 md:pt-24">
              <ProfileCard
                name="Habil Mushani"
                title="Full Stack Developer"
                handle="habil"
                status="fresh graduate"
                contactText="Contact Me"
                avatarUrl={asset("/avatar.png")}
                showUserInfo
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => {
                  window.location.href = "mailto:habilmushani0102@gmail.com";
                }}
                behindGlowColor="rgba(33, 133, 213, 0.6)"
                behindGlowEnabled
              />
            </div>
          </section>

          <section
            id="about"
            className="mx-auto flex min-h-screen max-w-6xl snap-start flex-col px-4 md:px-8"
          >
            <div className="flex flex-1 items-center py-10">
              <div className="grid w-full overflow-hidden rounded-[2rem] border border-[#2185D5]/40 bg-white/80 dark:bg-[#141416]/90 md:grid-cols-[420px_1fr]">
                <div className="relative z-20 h-[520px] overflow-hidden md:h-[720px]">
                  <div className="absolute inset-0 [&>div]:!h-full [&>div]:!w-full">
                    <Lanyard
                      position={[0, 1.7, 13]}
                      gravity={[0, -40, 0]}
                      ropeLength={0.8}
                    />
                  </div>
                </div>

                <div className="px-6 py-12 md:py-16 md:pl-4 md:pr-14">
                  <h2 className="text-4xl font-bold md:text-5xl">
                    Tentang <span className={accentText}>Saya</span>
                  </h2>

                  <p className="mt-5 border-l-2 border-[#2185D5]/60 pl-4 text-lg italic text-neutral-500 dark:text-gray-400">
                    Perpaduan logika kode dan estetika desain.
                  </p>

                  <div
                    className={`mt-6 space-y-5 text-base leading-7 md:text-lg ${bodyText}`}
                  >
                    <p>
                      Saya lulusan D3 Teknik Informatika Politeknik Negeri Batam
                      dengan fokus pada pengembangan web full-stack dan dukungan
                      infrastruktur IT. Lewat Project-Based Learning dan magang,
                      saya membangun sistem manajemen web, platform pencatatan
                      keuangan, dan modul inventaris.
                    </p>
                    <p>
                      Saya ingin menerapkan kemampuan teknis dan pemecahan
                      masalah itu sebagai IT Support atau Web Developer.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-8 dark:border-white/10">
                    {stats.map((item) => (
                      <div key={item.label}>
                        <p
                          className={`text-4xl font-bold md:text-5xl ${accentText}`}
                        >
                          {item.value}
                        </p>
                        <p
                          className={`mt-1 text-xs uppercase tracking-wide md:text-sm ${mutedText}`}
                        >
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={asset("/CV-Habil Mushani.pdf")}
                    download
                    className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#2185D5]/30 bg-[#2185D5] px-7 py-3.5 font-medium text-white transition-colors hover:bg-[#1b6fb3] dark:bg-[#2185D5]/20 dark:hover:bg-[#2185D5]/35"
                  >
                    Unduh CV
                    <FiDownload size={16} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="projects"
            className="mx-auto flex min-h-screen max-w-6xl snap-start flex-col px-4 md:px-8"
          >
            <div className="flex flex-1 flex-col justify-center py-16">
              <h2 className="text-4xl font-bold md:text-5xl">
                Featured <span className={accentText}>Projects</span>
              </h2>

              <p className="mt-5 max-w-2xl border-l-2 border-[#2185D5]/60 pl-4 text-lg italic text-neutral-500 dark:text-gray-400">
                Proyek yang saya bangun dan sertifikat yang saya raih.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {(
                  [
                    ["all", "Semua"],
                    ["project", "Project"],
                    ["certificate", "Sertifikat"],
                  ] as const
                ).map(([value, label]) => {
                  const count =
                    value === "all"
                      ? entries.length
                      : entries.filter((e) => e.kind === value).length;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setKindFilter(value)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                        kindFilter === value
                          ? "bg-[#2185D5] text-white"
                          : "border border-neutral-300 text-neutral-600 hover:text-neutral-900 dark:border-white/10 dark:text-white/60 dark:hover:text-white"
                      }`}
                    >
                      {label}
                      <span
                        className={`text-xs ${
                          kindFilter === value ? "text-white/80" : "opacity-60"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleEntries.map((entry) => (
                  <EntryCard
                    key={`${entry.kind}-${entry.title}-${entries.indexOf(entry)}`}
                    entry={entry}
                    onOpen={() => setSelected(entry)}
                  />
                ))}
              </div>
            </div>
          </section>

          <SkillsSection isDark={isDark} />
        </div>

        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 text-white">
          <Dock
            items={dockItems}
            className="bg-black/40 backdrop-blur-md"
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>

        {selected && <EntryModal entry={selected} onClose={closeProject} />}
      </main>
    </ClickSpark>
  );
}

export default App;
