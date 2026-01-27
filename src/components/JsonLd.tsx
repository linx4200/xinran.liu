
export const JsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Xinran Liu',
    url: 'https://xinranliu.com', // TODO: change 域名
    jobTitle: 'Independent Web Developer',
    sameAs: [
      'https://github.com/linx4200',
      'https://www.linkedin.com/in/xinran-liu-b5b3261a2/'
    ],
    knowsAbout: ['React', 'Vue', 'Next.js', 'Web Development', 'Tailwind CSS'],
  };


  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
