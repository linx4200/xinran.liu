import Image from 'next/image';
import profile from './profile-image.jpg';

import type { ComponentPropsWithoutRef } from 'react';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // todo: dynamically change the status
  const availability: 'free' | 'busy' = 'free';

  const status = availability === 'free'
    ? {
        indicatorClass: 'bg-emerald-500',
        label: 'Free',
        labelClass: 'text-emerald-600',
        summary: 'Available for Freelance Work',
      }
    : {
        indicatorClass: 'bg-red-500',
        label: 'Busy',
        labelClass: 'text-red-600',
        summary: 'Currently Booked',
      };

  const CTAButton = ({ text, link, type = 'normal' }: { text: string, link?: string, type?: 'primary' | 'normal' }) => (
    <a
      href={link} target='_blank'
      className={`inline-flex min-w-[10rem] justify-center px-5 py-2 rounded-full border text-sm font-medium tracking-wide transition-all duration-200 ease-out hover:-translate-y-0.5 ${
        type === 'normal'
          ? 'border-stone-300 text-stone-700 bg-white hover:border-stone-400 hover:text-stone-900 hover:bg-stone-100'
          : 'border-transparent bg-primary text-white hover:bg-primary/90'
      }`}
    >{text}</a>
  );

  return (
    <>
      <section className="flex justify-between mt-20">
        <div>
          <h1 className="text-5xl font-bold mb-5">Experienced Web Developer</h1>
          <p className="text-stone-600">Based in Shenzhen, China</p>
          <p className="text-2xl mt-10">
            <span className={`size-4 inline-block rounded-xl mr-4 ${status.indicatorClass}`} />
            {status.summary}
          </p>
        </div>
        <div>
          <Image className='rounded-[140px]' src={profile} alt="todo: a11y" width={280} height={280} />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl pb-5 border-b border-zinc-200/70 font-bold">Professional Background</h2>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Linkedin</h3>
            <p className="text-stone-600">View my professional experience and connect with me.</p>
          </div>
          <CTAButton text="View on LinkedIn" />
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Github</h3>
            <p className="text-stone-600">Explore my open-source projects, code, and contributions.</p>
          </div>
          <CTAButton text="View on GitHub" link="https://github.com/linx4200" />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl pb-5 border-b border-zinc-200/70 font-bold">Hire Me or Contact Me</h2>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Upwork</h3>
            <p className="text-stone-600">Hire me for freelance web development projects.</p>
          </div>
          <CTAButton text="Hire Me on Upwork" type="primary" />
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Fiverr</h3>
            <p className="text-stone-600">Order custom development services directly through Fiverr.</p>
          </div>
          <CTAButton text="Hire Me on Fiverr"  type="primary" />
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-stone-600">Let’s get in touch directly for collaboration or inquiries.</p>
          </div>
          <CTAButton text="Send an Email" />
        </div>
      </section>
    </>
  );
}
