import type { PageLoad } from './$types';
import { _fetchIsbn } from '../../search/+page';
 
export const load = (async({ params }) => {
  const res = await _fetchIsbn(params.isbn);
  return { res };
}) satisfies PageLoad;