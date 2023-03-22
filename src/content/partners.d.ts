type JobOffer = {
  title: string;
  description: Array<string>;
  url?: string;
}

type Partner = {
  title: string;
  description: Array<string>
  imgUrl: string;
  url?: string;
  jobOffers: Array<JobOffer>
}

declare module '@/content/partners.json' {
  export const mainPartner: Partner;
  export const otherPartners: Array<Partner & { slug: string }>;
}
