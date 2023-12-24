# SvelteKit `page` store updates after component

## Description

### Background

I would like to have easy-to-use search filters for an item collection. To allow for bookmarking and opening in a new tab, a suggested filter should just be a link with the corresponding filter added to the URL search params.

### Issue

This involves reading the current search params and per suggested filter creating a link, adding a search param to it. Using the page store directly in a component's script does not work properly, but appears to "lag behind" one page, presumably due to the page store being updated only after the component update/render. This only applies for links to the same path&mdash;see at path `/fixed` the link `TEST HOME "year=2019"`, which works as intended; presumably because no components are reused.

## Reproduction

Repo link: https://github.com/edgy-sphere/sveltekit-page-store-updates-after-component

- Clone: `git clone https://github.com/edgy-sphere/sveltekit-page-store-updates-after-component.git`
- Start the dev server: `npm run dev`
- Visit `localhost:5173` in a contemporary browser.

### Case A

(on path `/`) click e.g. on Parasite's year `2019`, then the director links for both Parasite and 1917 only include the respective director instead of also including `year=2019` in their search params. Clicking the `Test Director` button logs the correct link to everyone's favourite, the developer console.

### Case B

Following Case A (_not_ using the same URL, e.g. `/?year=2019`, instead you must navigate there from home `/`), click on `HOME`, then the links of the first two movies erroneously include `year=2019` as well&mdash;not the next four, I guess because the corresponding components of these are _created_, while the components of the first two are _reused_.

## Similar issues

- [#11046](https://github.com/sveltejs/kit/issues/11046)
- [#11417](https://github.com/sveltejs/kit/issues/11417) ?

## Workaround

When providing the page store as an argument to `hrefFilter(...)` (at `movie.svelte`) and not using it directly, all works as expected&mdash;see at path `/fixed`.

## Solution

Updating the page store before the component seems (to me) more reasonable, as components may rely on the page store while not vice versa.

While a simple workaround exists, it may not be immediately obvious to everyone. In any case, this issue hopefully will provide some help.

Please apologise that I am not providing any practical help toward fixing this, as I am not sure whether this actually works as intended, could not quite understand how components are reused, and since my mediocre coding skills compared to my Git proficiency appear like I am expert-master of the universe.

## System info

<pre>
System:
    OS: Windows 11 10.0.22621
    CPU: (4) x64 Intel(R) Core(TM) i5-6600K CPU @ 3.50GHz
    Memory: 24.65 GB / 31.95 GB
Binaries:
    Node: 20.3.1 - C:\Portable\node\node.EXE
    npm: 9.6.7 - C:\Portable\node\npm.CMD
Browsers:
    Edge: Chromium (120.0.2210.91)
    Internet Explorer: 11.0.22621.1
npmPackages:
    @sveltejs/adapter-auto: ^3.0.0 => 3.0.1 
    @sveltejs/kit: ^2.0.0 => 2.0.6 
    @sveltejs/vite-plugin-svelte: ^3.0.0 => 3.0.1 
    svelte: ^4.2.7 => 4.2.8 
    vite: ^5.0.3 => 5.0.10 
</pre>
