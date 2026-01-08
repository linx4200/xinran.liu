import { ProjectGrid } from '@/components/ProjectGrid';

export default function Page() {
  return (
    <section className="mt-20" aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="text-2xl font-bold" dev-mode="tailwind">Projects</h1>
      <ProjectGrid />
    </section>
  );
}
