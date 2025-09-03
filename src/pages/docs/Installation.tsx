import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';

export default function Installation() {
  return <DocsRenderer content={docsContent.installation} />;
}