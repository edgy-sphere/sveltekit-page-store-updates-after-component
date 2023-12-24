// This file only provides some data and corresponding logic and nothing relevant to the issue.

import type { PageLoad } from './$types';

export type Movie = {
    year: number,
    title: string,
    director: string
}

const _movies: Set<Movie> = new Set([
    { year: 2019, title: "1917", director: "Sam Mendes" },
    { year: 2019, title: "Parasite", director: "Bong Joon-ho" },
    { year: 2020, title: "Nomadland", director: "Chloé Zhao" },
    { year: 2020, title: "Mank", director: "David Fincher" },
    { year: 2021, title: "Dune", director: "Denis Villeneuve" },
    { year: 2021, title: "The Little Things", director: "John Lee Hancock" },
]);

const _index_year = new Map();
const _index_director = new Map();

for (const m of _movies) {
    const y = _index_year.get(m.year);
    if (y != null) {
        y.add(m);
    } else {
        _index_year.set(m.year, new Set([m]));
    }
    
    const d = _index_director.get(m.director);
    if (d != null) {
        d.add(m);
    } else {
        _index_director.set(m.director, new Set([m]));
    }
}

export const load: PageLoad = ({ url }) => {
    const index_results: Set<Movie>[] = [_movies];
    const filter_year_string = url.searchParams.get("year");
    const filter_director = url.searchParams.get("director");

    if (filter_year_string != null) {
        const filter_year = Number(filter_year_string);

        if (!isNaN(filter_year)) {
            const m = _index_year.get(filter_year);

            if (m != null) {
                index_results.push(m);
            } else {
                return { movies: [] };
            }
        }
    }

    if (filter_director != null) {
        const m = _index_director.get(filter_director);

        if (m != null) {
            index_results.push(m);
        } else {
            return { movies: [] };
        }
    }

    return { movies: intersect(index_results) };
}

function intersect<T>(sets:  Set<T>[]): T[] {
    sets.sort((l, r) => l.size - r.size);
    const smallest = sets.shift();
    const copy = new Set(smallest);

    if (smallest != null) {
        for (const item of smallest) {
            let intersectFailed = false;

            for (let i = 0; i < sets.length; ++i) {
                if (!sets[i].has(item)) {
                    intersectFailed = true;
                    break;
                }
            }

            if (intersectFailed) {
                copy.delete(item);
            }
        }
    }

    return [...copy];
}
