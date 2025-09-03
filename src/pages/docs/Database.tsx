import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';

export default function Database() {
  return <DocsRenderer content={docsContent.database} />;
}