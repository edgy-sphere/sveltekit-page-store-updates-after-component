<script lang="ts">
    import { page } from "$app/stores";
    import type { Movie } from "./+page";

    export let movie: Movie;

    function hrefFilter(name: string, value: string) {
        const params = new URLSearchParams([...$page.url.searchParams.entries()]);
        params.set(name, value);
        return `/?${params.toString()}`;
    }

    function test() {
        const params = new URLSearchParams([...$page.url.searchParams.entries()]);
        params.set("director", movie.director);
        console.log("test", `/?${params.toString()}`);
    }
</script>

<article>
    <h1>{movie.title}</h1>
    <a href={hrefFilter("year", movie.year.toString())}>{movie.year}</a>
    <a href={hrefFilter("director", movie.director)}>{movie.director}</a>
    <button on:click={test}>Test Director</button>
</article>
