export const categories = [
  { id: "career", label: "Career Growth", description: "Navigate transitions, promotions, and job searches" },
  { id: "leadership", label: "Leadership", description: "Build teams, manage people, and lead with impact" },
  { id: "startup", label: "Startups", description: "Founding, fundraising, and scaling early-stage companies" },
  { id: "tech", label: "Technology", description: "Engineering, product, and technical career paths" },
  { id: "design", label: "Design", description: "UX, visual design, and creative direction" },
  { id: "wellness", label: "Wellness", description: "Work-life balance, burnout recovery, and mental health" },
  { id: "finance", label: "Finance", description: "Personal finance, investing, and financial planning" },
  { id: "marketing", label: "Marketing", description: "Growth, branding, and go-to-market strategy" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
