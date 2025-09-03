import { useLocation } from 'react-router-dom';
import { docsContent, DocsContent } from '@/data/docsContent';

// Map routes to content keys
const routeContentMap: Record<string, keyof typeof docsContent> = {
  '/': 'introduction',
  '/quick-start': 'quickStart',
  '/installation': 'installation',
  '/api': 'apiReference',
  '/components': 'components',
  '/database': 'database',
};

export function useDocsContent(): DocsContent {
  const location = useLocation();
  const contentKey = routeContentMap[location.pathname] || 'introduction';
  
  return docsContent[contentKey];
}
