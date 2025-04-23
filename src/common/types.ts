import { ServicesLinkProps } from "@/components/layouts/servicesLink/servicesLink";
import { WordSwipeProps } from "@/components/ui/wordSwipe/wordSwipe";
import { LngLat } from "@yandex/ymaps3-types";
import { CaseCircle } from "@/components/layouts/caseCircle/caseCircle";

export type TagLink = {
  text: string;
  subLink: string;
};

export type Step = {
  stepNumber: string;
  header: string;
  description: string;
};

export type linkData = Omit<ServicesLinkProps, "number"> & { number?: string };

export type TextContent = {
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  wordSwipeProps: WordSwipeProps;
};

//SERVER RESPONSES
export type Photo = {
  team_general_image: string;
};

export type WorkStage = {
  number: number;
  title: string;
  text: string;
};

export type OgImage = {
  width: number;
  height: number;
  url: string;
  type: string;
};

export type Robots = {
  index?: string;
  follow?: string;
  nocache?: string;
  "max-snippet"?: string;
  "max-image-preview"?: string;
  "max-video-preview"?: string;
};

export type SEO = {
  yoast_head_json: SeoData;
  yoast_head: string;
};

export type SeoData = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  article_modified_time?: string;
  og_image?: OgImage[];
  robots?: Robots;
  twitter_card?: string;
  twitter_misc?: Record<string, string>;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: string;
};

//SERVICES
export type ServicesData = {
  id: number;
  title: string;
  url: string;
  image: string;
  child_services: ChildService[];
  service_number: string;
};

export type ChildService = {
  title: string;
  cost: string;
  serviceId: string;
};

export type ServiceCategoryPage = {
  id: number;
  title: string;
  url: string;
  service_number: string;
  description: string;
  image: string;
  child_services: CategoryServices[];
  serviceCategory: string;
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  words: string[];
  faq: Faq[];
  work_stages: WorkStage[];
};

export type CategoryServices = {
  title: string;
  serviceId: string;
};

export type ServicePageData = {
  id: number;
  title: string;
  full_name: string;
  first_description: string;
  image: string;
  for_whom_title: string;
  for_whom: string[];
  content: string;
  team: TeamMemberData[];
  team_text: string;
  cost: string;
  additional_services: AdditionalService[];
  faq: Faq[];
  work_stages: WorkStage[];
};

export type AdditionalService = {
  name: string;
  price: string;
};

export type TeamMemberData = {
  id: number;
  experience: string;
  name: string;
  position: string;
  description: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

//CASES
export type CasesData = {
  caseCircles: CaseCircle[];
  cases: CaseData[];
  total: number;
};

export type CaseData = {
  caseId: string;
  category: string;
  header: string;
  img: string;
  imgFullWidth: string;
  services: string[];
  projectCategories: string[];
};

export type CasesFiltersData = {
  id: string;
  name: string;
};

export type CasePageData = {
  id: number;
  title: string;
  services: string[];
  scope: string;
  website_url: {
    url: string;
    name: string;
  };
  image: string; //remove
  customer_logo: string; //remove
  description: string;
  task: string;
  images: {
    main: string;
    small: string;
    medium: string;
    big: string;
  };
  tech_stack: string;
  project_text: string;
  seo_data: SeoData;
};

//BLOG
export type ArticleData = {
  posts: Article[];
  total: number;
};

export type Article = {
  id: number;
  categories: string[];
  date: string;
  excerpt: string;
  image: string;
  title: string;
  slug: string;
};

export type ArticlesFilters = {
  categories: { name: string }[];
};

export type ArticlePageData = {
  id: number;
  categories: string[];
  date: string;
  image: string;
  title: string;
  reading_time: string;
  content: string;
  faq: { question: string; answer: string }[];
};

//CONTACTS
export type ContactsData = {
  working_hours: string;
  address: string;
  phone: string;
  email: string;
  social_links: Social[];
  map_coordinates: LngLat;
  map_place_coordinates: LngLat;
  requisites: Requisites;
  offer_pdf: string;
};

export type Social = {
  name: string;
  url: string;
};

export type Requisites = {
  legal_name: string;
  activity: string;
  inn: string;
  account: string;
  bank: string;
  corr_account: string;
  bic: string;
};

//PRIVACY POLICY
export type DocumentData = {
  title: string;
  content: string;
  pdf_file: string;
};

//ERRORS
export type ServerError = {
  code: string;
  message: string;
  data: {
    status: number;
  };
};
