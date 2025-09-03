import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';

export default function ApiReference() {
  return <DocsRenderer content={docsContent.apiReference} />;
}