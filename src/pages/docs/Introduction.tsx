import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';

export default function Introduction() {
  return <DocsRenderer content={docsContent.introduction} />;
}