//types
export type FieldType = {
  required: boolean;
  label: string;
  placeholder?: string;
  currentValue?: string;
};

export type Field = {
  [key: string]: FieldType;
};

export type SectionName =
  | "contactInfo"
  | "about"
  | "details"
  | "targetGroup"
  | "materials"
  | "additionalInfo";

export type AllFields = Record<SectionName, Field>;

export type DirtyField = {
  [key: string]: boolean | boolean[] | undefined;
};

export const defaultBriefValues = {
  contactInfo: {
    name: "",
    position: "",
    tel: "",
    email: "",
    communicationWay: [],
  },
  about: {
    companyName: "",
    semantics: "",
    field: "",
    productsAndServices: "",
    productsAndServicesDescription: "",
    priorityProductsAndServices: "",
    offerUniqueness: "",
    disadvantages: "",
    geography: "",
    shortCompanyInfo: "",
    site: "",
    socialNetworks: "",
    competitors: "",
  },
  details: {
    siteType: "landing",
    goals: "",
    usersTargetAction: [],
    competitorsSites: "",
    advantagesCompetitorsSites: "",
    disadvantagesCompetitorsSites: "",
    sitesYouLike: "",
    sitesYouDislike: "",
    preferredColors: "",
    unwantedColors: "",
    siteFunctionality: [],
    specificSystem: "",
    seo: "yes",
    copywriting: "yes",
  },
  targetGroup: {
    knowTargetAudience: "yes",
    sex: "",
    age: "",
    income: "",
    interests: "",
    useInteractionStages: "",
    communicationChannels: "",
    intensityOfUse: "",
  },
  materials: {
    materialsDevelopment: "yes",
    materialsToDevelop: "",
  },
  additionalInfo: {
    numberOfLanguageVersions: "1",
    budget: "",
    technicalSpecificationAvailable: "yes",
    technicalSpecification: {} as FileList,
    siteAdministration: "yes",
    additionalInfo: "",
    additionalFiles: {} as FileList,
  },
  permission: true as const,
};
