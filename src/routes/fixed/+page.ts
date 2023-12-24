import { load as loadParent } from "../+page";
import type { PageLoad } from './$types';

export const load: PageLoad = (p) => {
    return loadParent(p);
}
