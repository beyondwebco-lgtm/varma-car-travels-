export default function sitemap() {
  const baseUrl = 'https://varmacartravels.com';
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/#about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/#vehicles`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/#why-us`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/#location`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ];
}
