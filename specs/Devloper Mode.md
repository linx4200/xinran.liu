# Technical Design For Developer Mode

## Functions

1. 入口：hero section 展示开关：🏗️ See how this website is built? toggle 开关。当这个 hero section 开关不在可视区域的时候，就显示在左下角一个浮动的 ICON。

打开开关后，分三个 mode 的开关，类似那种 Tab 的那种。

Mode 1: React

Mode 2: Tailwind CSS

Mode 3: Next.js (Backend API)


颗粒度？

### React Mode

展示：<ComponentName />

颗粒度：组件文件

类似 console 里的选取模式？但是组件的信息要展示在哪里呢？右边打开一个 Drawer ?


### Tailwind Mode

展示就抄 tailwind 官网就好了，

但是颗粒度？得根据展示情况手工筛选了。