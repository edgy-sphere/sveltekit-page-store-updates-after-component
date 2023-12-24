<script lang="ts">
    import type { PageData } from './$types';
    import MovieComponent from "./movie.svelte";

    export let data: PageData;
</script>


<div>
    <a href="/">HOME</a>
    <a href="/fixed">FIXED</a>
    {#each data.movies as movie}
        <MovieComponent {movie} />
    {/each}
</div>
