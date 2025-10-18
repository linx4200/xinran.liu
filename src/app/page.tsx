export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <section>
          <h1>Hi, I&#39;m Xinran Liu.</h1>
          {/* todo: 突出 freelancer */}
          <p>I&#39;m a software engineer specializing in modern web development.</p>
          {/* todo: developer mode switch */}
        </section>
        <div>
          <section>
            <h2>Selected Projects</h2>
            <div>
              Vue color picker
            </div>
            <div>
              After zzz alarm
            </div>
          </section>
          <section>
            <h2>Skills</h2>
            <ul>
              <li>React</li>
            </ul>
          </section>
        </div>
      </div>

      <footer>
        <h2>Get in Touch</h2>
        {/* <p>todo....</p> */}
      </footer>
    </>
  );
}
