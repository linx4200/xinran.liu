import { ProjectCard } from '@/app/components/ProjectCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 mt-20 row-start-2 items-center sm:items-start">
      <section className="text-center w-full">
        <h1 className="text-5xl font-bold mb-4">Hi, I&#39;m Xinran Liu.</h1>
        <p className="text-lg text-stone-500">An independent web developer specializing in building fast, modern, <br/>and maintainable web applications.</p>
        {/* todo: developer mode switch */}
      </section>
      <section className="text-center w-full">
        <h2 className="text-2xl font-bold mb-4">Selected Projects</h2>
        <div className="flex gap-20">
          <ProjectCard title='Vue Color Picker' desc='A powerful color picker component library.' />
          <ProjectCard title='Alarm' desc='A powerful color picker component library.A powerful color picker component library.A powerful color picker component library.' />
          <ProjectCard title='Personal Website' />
        </div>
      </section>
      <section className="text-center w-full">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <ul>
          <li>React</li>
        </ul>
      </section>
      <section className="w-full text-center bg-stone-50 py-10">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        {/* todo: refine this copy */}
        <p className="text-base text-stone-500 mb-8">If you&#39;re interested in working together or just want<br />to say hello, please reach out!</p>
        <Link className="border-primary border-1 rounded-lg py-2 px-4 text-primary text-base" href="/contact">Contact Me</Link>
      </section>
    </div>
  );
}
