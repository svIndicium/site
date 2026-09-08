export const usePartners = () => {
  const { data: mainPartner } = useAsyncData('mainPartner', () =>
    queryCollection('partners').where('tier', '=', 'main').first(),
  );

  const { data: premiumPartners } = useAsyncData('premiumPartners', () =>
    queryCollection('partners').where('tier', '=', 'premium').order('order', 'ASC').all(),
  );

  const { data: regularPartners } = useAsyncData('regularPartners', () =>
    queryCollection('partners').where('tier', '=', 'regular').order('order', 'ASC').all(),
  );

  return { mainPartner, premiumPartners, regularPartners };
};
