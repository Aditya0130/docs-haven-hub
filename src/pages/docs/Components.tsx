import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';

export default function Components() {
  return <DocsRenderer content={docsContent.components} />;
}