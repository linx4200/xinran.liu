import Image from 'next/image';
import profile from './profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { getDictionary } from '@/dictionaries';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // todo: dynamically change the status
  const availability: 'free' | 'busy' = 'free';
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // todo: 添加下一个 available 的时间，跳转到 google calendar 
  const status = availability === 'free'
    ? {
      indicatorClass: 'bg-emerald-500',
      label: dict.contact.status.free,
      labelClass: 'text-emerald-600',
      summary: dict.contact.status.available,
    }
    : {
      indicatorClass: 'bg-red-500',
      label: dict.contact.status.busy,
      labelClass: 'text-red-600',
      summary: dict.contact.status.booked,
    };

  const CTAButton = ({ text, link, type = 'normal' }: { text: string, link?: string, type?: 'primary' | 'normal' }) => {
    const isDisabled = !link;
    const variantClassName = type === 'normal'
      ? 'border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 bg-white dark:bg-surface-strong'
      : 'border-transparent bg-primary text-white';
    const hoverClassName = isDisabled
      ? 'cursor-not-allowed opacity-60'
      : type === 'normal'
        ? 'hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700'
        : 'hover:bg-primary/90';
    const sharedClassName = `inline-flex min-w-[10rem] justify-center px-5 py-2 rounded-full border text-sm font-medium tracking-wide transition-all duration-200 ease-out ${variantClassName} ${hoverClassName}`;

    if (isDisabled) {
      return (
        <button type="button" className={sharedClassName} disabled aria-disabled>
          {text}
        </button>
      );
    }

    return (
      <a
        href={link}
        target='_blank'
        rel="noreferrer noopener"
        className={sharedClassName}
      >
        {text}
      </a>
    );
  };

  return (
    <>
      <section className="flex justify-between mt-20" aria-labelledby="contact-hero-heading" dev-mode="tailwind">
        <div>
          <h1 id="contact-hero-heading" className="text-5xl font-bold mb-5" dev-mode="tailwind">{dict.contact.hero.title}</h1>
          <p className="text-text-muted" dev-mode="tailwind">{dict.contact.hero.location}</p>
          <p className="text-2xl mt-10" role="status" aria-live="polite" dev-mode="tailwind">
            <span className={`size-4 inline-block rounded-xl mr-4 ${status.indicatorClass}`} aria-hidden="true" />
            {status.summary}
          </p>
        </div>
        <div className="relative">
          <Image className='rounded-[140px]' src={profile} alt="Portrait of Xinran Liu" />
          <a href='https://www.instagram.com/xinranwhatever' target='_blank' rel="noreferrer noopener" aria-label="Visit Xinran Liu on Instagram" className="
            absolute right-0 bottom-0 w-[60px] h-[60px] pl-[7.5px] pr-[7.5px] pt-[3.75px] pb-[3.75px]
            rounded-[30%] bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]
          ">
            <FontAwesomeIcon icon={faInstagram} color='white' />
          </a>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="professional-background-heading">
        <h2 id="professional-background-heading" className="text-2xl pb-5 border-b border-border border-solid font-bold">{dict.contact.sections.professionalBackground}</h2>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">{dict.contact.links.linkedin.title}</h3>
            <p className="text-text-muted" dev-mode="tailwind">{dict.contact.links.linkedin.description}</p>
          </div>
          <CTAButton text={dict.contact.links.linkedin.button} />
        </div>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">{dict.contact.links.github.title}</h3>
            <p className="text-text-muted" dev-mode="tailwind">{dict.contact.links.github.description}</p>
          </div>
          <CTAButton text={dict.contact.links.github.button} link="https://github.com/linx4200" />
        </div>
      </section>

      <section className="mt-20" aria-labelledby="hire-contact-heading">
        <h2 id="hire-contact-heading" className="text-2xl pb-5 border-b border-border border-solid font-bold">{dict.contact.sections.hireOrContact}</h2>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">{dict.contact.links.upwork.title}</h3>
            <p className="text-text-muted" dev-mode="tailwind">{dict.contact.links.upwork.description}</p>
          </div>
          <CTAButton text={dict.contact.links.upwork.button} type="primary" />
        </div>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">{dict.contact.links.fiverr.title}</h3>
            <p className="text-text-muted" dev-mode="tailwind">{dict.contact.links.fiverr.description}</p>
          </div>
          <CTAButton text={dict.contact.links.fiverr.button} type="primary" />
        </div>
        <div className="flex justify-between mt-5 items-center" dev-mode="tailwind">
          <div>
            <h3 className="font-bold mb-2" dev-mode="tailwind">{dict.contact.links.email.title}</h3>
            <p className="text-text-muted" dev-mode="tailwind">{dict.contact.links.email.description}</p>
          </div>
          <CTAButton text={dict.contact.links.email.button} />
        </div>
      </section>
    </>
  );
}
