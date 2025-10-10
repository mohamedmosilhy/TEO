// src/data/projectsData.js

// Helper: sort image keys before mapping
function sortAndMap(images) {
  return Object.keys(images)
    .sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)/)?.[0] || 0, 10);
      const numB = parseInt(b.match(/(\d+)/)?.[0] || 0, 10);
      return numA - numB || a.localeCompare(b);
    })
    .map((key) => images[key].default);
}

// Auto-load + sort all project images
const project1Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/residential/design/town-house-karma-gates/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project2Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/residential/design/i-villa-abha-compound/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project4Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/residential/design/paint-house-el-patio-oro/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project6Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/landscaping/design/PROJECT1/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project7Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/landscaping/design/PROJECT2/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project8Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/landscaping/design/PROJECT3/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project9Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/landscaping/design/Villa palm valley/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

const project10Images = sortAndMap(
  import.meta.glob(
    "../assets/images/projects/residential/design/Villa in PATIO EL ZAHRAA/*.{jpg,jpeg,png}",
    { eager: true }
  )
);

export const projects = [
  {
    id: 1,
    img: project1Images[0],
    title: "TOWN HOUSE KARMA GATES",
    category: "Residential",
    type: "Design",
    images: project1Images,
  },
  {
    id: 2,
    img: project2Images[0],
    title: "I VILLA - ABHA COMPOUND",
    category: "Residential",
    type: "Design",
    images: project2Images,
  },
  {
    id: 3,
    img: project4Images[0],
    title: "PAINT HOUSE - El-Patio Oro",
    category: "Residential",
    type: "Design",
    images: project4Images,
  },
  {
    id: 4,
    img: project6Images[0],
    title: "PROJECT 1",
    category: "Landscaping",
    type: "Design",
    images: project6Images,
  },
  {
    id: 5,
    img: project7Images[0],
    title: "PROJECT 2",
    category: "Landscaping",
    type: "Design",
    images: project7Images,
  },
  {
    id: 6,
    img: project8Images[0],
    title: "PROJECT 3",
    category: "Landscaping",
    type: "Design",
    images: project8Images,
  },
  {
    id: 7,
    img: project9Images[0],
    title: "Villa palm valley",
    category: "Landscaping",
    type: "Design",
    images: project9Images,
  },
  {
    id: 8,
    img: project10Images[0],
    title: "Villa in PATIO EL ZAHRAA",
    category: "Residential",
    type: "Design",
    images: project10Images,
  },
];

export const categories = ["All", "Residential", "Commercial", "Landscaping"];
export const types = ["All", "Design", "Real"];
