import { DocsRenderer } from '@/components/DocsRenderer';
import { useDocsContent } from '@/hooks/use-docs-content';

export default function Components() {
  const content = useDocsContent();
  
  return <DocsRenderer content={content} />;
}