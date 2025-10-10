// ✅ Helper: sort and map media files
function sortAndMap(files) {
  return Object.keys(files)
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
      return numA - numB || a.localeCompare(b);
    })
    .map((key) => files[key].default);
}

// ✅ Define all static imports (images + videos)
const mediaImports = {
  karma: import.meta.glob(
    "../assets/images/projects/residential/design/town-house-karma-gates/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  abha: import.meta.glob(
    "../assets/images/projects/residential/design/i-villa-abha-compound/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  patioOro: import.meta.glob(
    "../assets/images/projects/residential/design/paint-house-el-patio-oro/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  golfExtension: import.meta.glob(
    "../assets/images/projects/landscaping/design/PROJECT1/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  palmValley: import.meta.glob(
    "../assets/images/projects/landscaping/design/Villa palm valley/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  project2: import.meta.glob(
    "../assets/images/projects/landscaping/design/PROJECT2/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  project3: import.meta.glob(
    "../assets/images/projects/landscaping/design/PROJECT3/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  patioZahraa: import.meta.glob(
    "../assets/images/projects/residential/design/Villa in PATIO EL ZAHRAA/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  duplexElSheikhZayed: import.meta.glob(
    "../assets/images/projects/residential/real/DUPLEX - EL SHEIKH ZAYED/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
};

// ✅ Build projects with static imports
export const projects = [
  {
    id: 1,
    title: "TOWN HOUSE KARMA GATES",
    category: "Residential",
    type: "Design",
    media: sortAndMap(mediaImports.karma),
  },
  {
    id: 2,
    title: "I VILLA - ABHA COMPOUND",
    category: "Residential",
    type: "Design",
    media: sortAndMap(mediaImports.abha),
  },
  {
    id: 3,
    title: "PENTHOUSE - EL PATIO ORO",
    category: "Residential",
    type: "Design",
    media: sortAndMap(mediaImports.patioOro),
  },
  {
    id: 4,
    title: "VILLA - GOLF EXTENSION",
    category: "Landscaping",
    type: "Design",
    media: sortAndMap(mediaImports.golfExtension),
  },
  {
    id: 5,
    title: "VILLA - PALM VALLEY",
    category: "Landscaping",
    type: "Design",
    media: [
      ...sortAndMap(mediaImports.palmValley),
      ...sortAndMap(mediaImports.project2),
      ...sortAndMap(mediaImports.project3),
    ],
  },
  {
    id: 6,
    title: "VILLA in PATIO EL ZAHRAA",
    category: "Residential",
    type: "Design",
    media: sortAndMap(mediaImports.patioZahraa),
  },
  {
    id: 7,
    title: "DUPLEX - EL SHEIKH ZAYED",
    category: "Residential",
    type: "Real",
    media: sortAndMap(mediaImports.duplexElSheikhZayed),
  },
].map((p) => ({
  ...p,
  img: p.media[0], // first image/video as cover
}));

export const categories = ["All", "Residential", "Commercial", "Landscaping"];
export const types = ["All", "Design", "Real"];
