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

// ✅ Helper: find and exclude cover image
function extractCover(files) {
  let cover = null;
  const filteredFiles = {};

  for (const [key, value] of Object.entries(files)) {
    if (/cover\.(jpg|jpeg|png|webp)$/i.test(key)) {
      cover = value.default;
    } else {
      filteredFiles[key] = value;
    }
  }

  return { cover, filteredFiles };
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
    "../assets/images/projects/residential/real/DUPLEX - COMPOUND ABHA/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  penthouseAbha: import.meta.glob(
    "../assets/images/projects/residential/real/PENTHOUSE -ABHA/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  penthouseVillaria: import.meta.glob(
    "../assets/images/projects/residential/real/PENTHOUSE - COMPOUND VILLARIA/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
  coWorkingBusinessCenter: import.meta.glob(
    "../assets/images/projects/commercial/design/CO-WORKING BUSINESS CENTER - ISTANBUL/*.{jpg,jpeg,png,mp4,webm,ogg}",
    { eager: true }
  ),
};

// ✅ Build projects with static imports
export const projects = [
  {
    id: 1,
    title: "TOWN HOUSE - KARMA GATES COMPOUND",
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
    title: "PENTHOUSE - ABHA COMPOUND",
    category: "Residential",
    type: "Design",
    media: sortAndMap(mediaImports.patioOro),
  },
  {
    id: 4,
    title: "PENTHOUSE- DIAR 2 COMPOUND",
    category: "Landscaping",
    type: "Design",
    media: sortAndMap(mediaImports.golfExtension),
  },
  {
    id: 5,
    title: "VILLA - PALM VALLEY COMPOUND",
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
    title: "VILLA - PATIO EL ZAHRAA COMPOUND",
    category: "Residential",
    type: "Design",
    media: sortAndMap(mediaImports.patioZahraa),
  },
  // ✅ Special handling for CO-WORKING BUSINESS CENTER
  (() => {
    const { cover, filteredFiles } = extractCover(
      mediaImports.coWorkingBusinessCenter
    );
    return {
      id: 7,
      title: "BUSINESS CENTER - ISTANBUL",
      category: "Commercial",
      type: "Design",
      cover,
      media: sortAndMap(filteredFiles),
    };
  })(),
  // ✅ Special handling for DUPLEX
  (() => {
    const { cover, filteredFiles } = extractCover(mediaImports.penthouseAbha);
    return {
      id: 8,
      title: "PENTHOUSE - ABHA COMPOUND",
      category: "Residential",
      type: "Real",
      cover,
      media: sortAndMap(filteredFiles),
    };
  })(),
  // ✅ Special handling for PENTHOUSE
  (() => {
    const { cover, filteredFiles } = extractCover(
      mediaImports.penthouseVillaria
    );
    return {
      id: 9,
      title: "PENTHOUSE - VILLARIA COMPOUND",
      category: "Residential",
      type: "Real",
      cover,
      media: sortAndMap(filteredFiles),
    };
  })(),

  // ✅ Special handling for DUPLEX
  (() => {
    const { cover, filteredFiles } = extractCover(
      mediaImports.duplexElSheikhZayed
    );
    return {
      id: 10,
      title: "DUPLEX - ABHA COMPOUND",
      category: "Residential",
      type: "Real",
      cover,
      media: sortAndMap(filteredFiles),
    };
  })(),
].map((p) => ({
  ...p,
  img: p.cover || p.media[0], // ✅ Prefer cover if available
}));

// ✅ Filters
export const categories = ["All", "Residential", "Commercial", "Landscaping"];
export const types = ["All", "Design", "Real"];
