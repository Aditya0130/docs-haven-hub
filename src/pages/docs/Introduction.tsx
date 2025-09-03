import { DocsRenderer } from '@/components/DocsRenderer';
import { docsContent } from '@/data/docsContent';
import { usePolarisContext } from '@contentstack/polaris-core';
export default function Introduction() {
  usePolarisContext({
    module: 'docs:introduction',
    data:  docsContent.introduction,
  })
  return <DocsRenderer content={docsContent.introduction} />;
}