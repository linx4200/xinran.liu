import Image from 'next/image';
import profile from './profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

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
      <section className="flex justify-between mt-20" dev-mode="tailwind">
        <div>
          <h1 className="text-5xl font-bold mb-5" dev-mode="tailwind">Experienced Web Developer</h1>
          <p className="text-stone-600" dev-mode="tailwind">Based in Shenzhen, China</p>
          <p className="text-2xl mt-10" dev-mode="tailwind">
            <span className={`size-4 inline-block rounded-xl mr-4 ${status.indicatorClass}`} />
            {status.summary}
          </p>
        </div>
        <div className="relative">
          <Image className='rounded-[140px]' src={profile} alt="todo: a11y" width={280} height={280} />
          <a href='https://www.instagram.com/xinranwhatever' target='_blank' className="
            absolute right-0 bottom-0 w-[60px] h-[60px] pl-[7.5px] pr-[7.5px] pt-[3.75px] pb-[3.75px]
            rounded-[30%] bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]
          ">
            <FontAwesomeIcon icon={faInstagram} color='white' />
          </a>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl pb-5 border-b border-b-zinc-200/70 border-solid font-bold">Professional Background</h2>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">Linkedin</h3>
            <p className="text-stone-600" dev-mode="tailwind">View my professional experience and connect with me.</p>
          </div>
          <CTAButton text="View on LinkedIn" />
        </div>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">Github</h3>
            <p className="text-stone-600" dev-mode="tailwind">Explore my open-source projects, code, and contributions.</p>
          </div>
          <CTAButton text="View on GitHub" link="https://github.com/linx4200" />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl pb-5 border-b border-b-zinc-200/70 border-solid font-bold">Hire Me or Contact Me</h2>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">Upwork</h3>
            <p className="text-stone-600" dev-mode="tailwind">Hire me for freelance web development projects.</p>
          </div>
          <CTAButton text="Hire Me on Upwork" type="primary" />
        </div>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">Fiverr</h3>
            <p className="text-stone-600" dev-mode="tailwind">Order custom development services directly through Fiverr.</p>
          </div>
          <CTAButton text="Hire Me on Fiverr"  type="primary" />
        </div>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">Email</h3>
            <p className="text-stone-600" dev-mode="tailwind">Let’s get in touch directly for collaboration or inquiries.</p>
          </div>
          <CTAButton text="Send an Email" />
        </div>
      </section>
    </>
  );
}
