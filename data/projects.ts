type Project = {
  title: string;
  slug: string;
  detailHref?: string;
  description: string;
  technologies: string;
  repositories: { label: string; href: string }[];
};

export const eShopProject = {
  title: "E-Shop",
  slug: "e-shop",
  detailHref: "/projects/e-shop",
  description:
    "A React storefront and Spring Boot API with role-based access, Stripe checkout, and server-side order validation.",
  technologies: "Java · Spring Boot · React · PostgreSQL · Stripe",
  repositories: [
    { label: "Frontend", href: "https://github.com/Derek376/react-ecom" },
    { label: "Backend", href: "https://github.com/Derek376/sb-ecom" },
  ],
};

export const tableProject = {
  title: "Tablé",
  slug: "table",
  detailHref: "/projects/table",
  description:
    "A team-built dining reservation platform. I led the Express API and database work for bookings, offers, campaigns, and ETA checks.",
  technologies: "Node.js · Express · PostgreSQL · REST APIs",
  repositories: [
    {
      label: "Team repository",
      href: "https://github.com/chukwuemekanwoke-jpg/comp47360-team2",
    },
  ],
};

export const dublinBikesProject = {
  title: "Dublin Bikes",
  slug: "dublin-bikes",
  detailHref: "/projects/dublin-bikes",
  description:
    "A team-built Flask app for bike station availability, weather, and occupancy predictions. I focused on the backend and contributed to prediction work.",
  technologies: "Python · Flask · MySQL · scikit-learn",
  repositories: [
    {
      label: "Team repository",
      href: "https://github.com/Derek376/dublin-bikes-webapp",
    },
  ],
};

export const projects: Project[] = [
  eShopProject,
  tableProject,
  dublinBikesProject,
];
