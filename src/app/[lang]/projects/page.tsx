import { ProjectGrid } from '@/components/ProjectGrid';
import type { Locale } from '@/dictionaries';

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  return (
    <section className="mt-20" aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="text-2xl font-bold" dev-mode="tailwind">Projects</h1>
      <ProjectGrid lang={lang as Locale} />
    </section>
  );
}
