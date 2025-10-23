import Image from 'next/image';
import profile from './profile-image.jpg'

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <>
      <section className="flex justify-between mt-20">
        <div>
          <h1 className="text-5xl font-bold mb-4">Experienced Web Developer</h1>
          {/* todo: status (free / busy) 状态显示 */}
          <p className="text-2xl mt-10">
            <span className='size-4 inline-block bg-green-500 rounded-xl mr-4'>{/* status indicator */}</span>
            Available for Freelance Work
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
            <p className="text-stone-600">View my professional experience and network</p>
          </div>
          <a className="border rounded-xl py-1.5 px-6 border-stone-500 text-stone-500">View on LinkedIn</a>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Github</h3>
            <p className="text-stone-600">See my open-source projects and code</p>
          </div>
          <a className="border rounded-xl py-1.5 px-6 border-stone-500 text-stone-500">View on GitHub</a>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl pb-5 border-b border-zinc-200/70 font-bold">Hire Me or Contact Me</h2>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Upwork</h3>
            <p className="text-stone-600">Hire me for freelance projects</p>
          </div>
          <a className="border rounded-xl py-2 px-5 border-primary text-primary">Hire Me on Upwork</a>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Fiberr</h3>
            <p className="text-stone-600">Order ..... ???</p>
          </div>
          <a className="border rounded-xl py-2 px-5 border-primary text-primary">Order on Fiverr</a>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-stone-600">Lets get in touch directly</p>
          </div>
          <a className="border rounded-xl py-1.5 px-6 border-stone-500 text-stone-500">Send an Email</a>
        </div>
      </section>
    </>
  );
}