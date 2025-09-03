import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';

export default function QuickStart() {
  return <DocsRenderer content={docsContent.quickStart} />;
}