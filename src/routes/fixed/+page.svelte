<script lang="ts">
    import type { PageData } from './$types';
    import MovieComponent from "./movie.svelte";

    export let data: PageData;
</script>


<div>
    <a href="/">HOME</a>
    <a href="/fixed">FIXED</a>
    <a href="/?year=2019">TEST HOME "year=2019"</a>
    {#each data.movies as movie}
        <MovieComponent {movie} />
    {/each}
</div>
