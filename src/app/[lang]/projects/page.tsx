import { ProjectGrid } from '@/components/ProjectGrid';
import { getDictionary } from '@/dictionaries';

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <section className="mt-20" aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="text-2xl font-bold" dev-mode="tailwind">{dict.nav.projects}</h1>
      <ProjectGrid lang={lang} />
    </section>
  );
}
