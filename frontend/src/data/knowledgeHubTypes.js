/**
 * Knowledge Hub type labels.
 *
 * Deliberately kept in its own module, with NO data imports, so client
 * components can import the labels without pulling in knowledgeHubIndex's
 * dependency graph (blogPostsData is ~578 KB and contains full article HTML).
 * Importing HUB_TYPES from knowledgeHubIndex used to drag that entire graph
 * into the /knowledge client bundle.
 */
export const HUB_TYPES = {
  guide: { label: 'Technical Guide', plural: 'Technical Guides' },
  news: { label: 'Industry News', plural: 'Industry News' },
  reference: { label: 'Engineering Reference', plural: 'Engineering References' },
  datasheet: { label: 'Technical Datasheet', plural: 'Technical Datasheets' },
};

export default HUB_TYPES;
