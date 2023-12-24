<script lang="ts">
    import { page } from "$app/stores";
    import type { Movie } from "../+page";

    export let movie: Movie;

    function hrefFilter(url: URL, name: string, value: string) {
        const params = new URLSearchParams([...url.searchParams.entries()]);
        params.set(name, value);
        return `/fixed?${params.toString()}`;
    }
</script>

<article>
    <h1>{movie.title}</h1>
    <a href={hrefFilter($page.url, "year", movie.year.toString())}>{movie.year}</a>
    <a href={hrefFilter($page.url, "director", movie.director)}>{movie.director}</a>
</article>
