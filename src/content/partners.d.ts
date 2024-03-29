type JobOffer = {
  title: string;
  description: Array<string>;
  url?: string;
};

type Partner = {
  slug: string;
  title: string;
  description: Array<string>;
  imgUrl: string;
  imgUrlDark?: string;
  url?: string;
  jobOffers: Array<JobOffer>;
};

declare module '@/content/partners.json' {
  export const mainPartner: Partner;
  export const premiumPartners: Array<Partner>;
  export const regularPartners: Array<Partner>;
}
