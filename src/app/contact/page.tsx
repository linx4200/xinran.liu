export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return <>
    <h1>Let&#39; Work Together.</h1>
    <p>I&#39;m open for freelance projects and collaborations.</p>
    {/* todo: status (free / busy) 状态显示 */}
    <h2>了解我的专业背景</h2>
    <section>
      <div>
        Linkedin
        <p>View my professional experience and network.</p>
        <a>View on LinkedIn</a>
      </div>
      <div>
        Linkedin
        <p>View my open-source projects and code.</p>
        <a>View on Github</a>
      </div>
    </section>

    <h2>直接雇佣或联系我</h2>
    <section>
      <div>
        <a>Hire me on Upwork</a>
      </div>
      <div>
        <a>Order on Fiverr</a>
      </div>
      <div>
        <a>Contact me via email</a>
      </div>
    </section>
  </>
}