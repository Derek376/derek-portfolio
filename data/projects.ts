export const eShopProject = {
  title: "E-Shop",
  slug: "e-shop",
  description:
    "A React storefront and Spring Boot API with role-based access, Stripe checkout, and server-side order validation.",
  technologies: "Java · Spring Boot · React · PostgreSQL · Stripe",
  repositories: [
    { label: "Frontend", href: "https://github.com/Derek376/react-ecom" },
    { label: "Backend", href: "https://github.com/Derek376/sb-ecom" },
  ],
};

export const projects = [
  eShopProject,
  {
    title: "Tablé",
    slug: "table",
    description:
      "A team-built dining reservation platform. I led the Express API and database work for bookings, offers, campaigns, and ETA checks.",
    technologies: "Node.js · Express · PostgreSQL · REST APIs",
    repositories: [
      {
        label: "Team repository",
        href: "https://github.com/chukwuemekanwoke-jpg/comp47360-team2",
      },
    ],
  },
  {
    title: "Dublin Bikes",
    slug: "dublin-bikes",
    description:
      "A team-built Flask app showing bike station availability, weather, historical trends, and occupancy predictions.",
    technologies: "Python · Flask · MySQL · scikit-learn",
    repositories: [
      {
        label: "Team repository",
        href: "https://github.com/Derek376/dublin-bikes-webapp",
      },
    ],
  },
];
