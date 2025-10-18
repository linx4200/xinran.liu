export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <>
      <h1>Projects</h1>
      <div>
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 cursor-pointer">
          <div className="aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden">
            <img src="/projects/vue-color-thumb.png" alt="Vue Color Picker" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-gray-900">Vue-Color Picker</h3>
          <p className="text-sm text-gray-500">A powerful color picker component library.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Vue 3</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">TypeScript</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Vite</span>
          </div>
          <div className="flex gap-4 mt-3 text-gray-400">
            <a href="https://github.com/linx4200/vue-color" className="hover:text-gray-700">💻</a>
            <a href="https://vue-color.vercel.app" className="hover:text-gray-700">🔗</a>
          </div>
        </div>

      </div>
    </>
  );
}