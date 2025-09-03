import { DocsContent, DocsSection, TableData, CalloutData } from '@/data/docsContent';

interface DocsRendererProps {
  content: DocsContent;
}

export function DocsRenderer({ content }: DocsRendererProps) {
  const renderSection = (section: DocsSection, index: number) => {
    switch (section.type) {
      case 'heading':
        const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className={getHeadingClasses(section.level)}>
            {section.content as string}
          </HeadingTag>
        );
      
      case 'paragraph':
        return (
          <p key={index} className="mb-4">
            {section.content as string}
          </p>
        );
      
      case 'list':
        return (
          <ul key={index} className="list-disc list-inside mb-6 space-y-1">
            {(section.content as string[]).map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      
      case 'code':
        return (
          <pre key={index} className="bg-docs-code-bg rounded-lg p-4 mb-6 overflow-x-auto">
            <code className="text-sm">{section.content as string}</code>
          </pre>
        );
      
      case 'table':
        const tableData = section.content as TableData;
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-docs-border-subtle">
              <thead>
                <tr className="bg-muted">
                  {tableData.headers.map((header, headerIndex) => (
                    <th 
                      key={headerIndex} 
                      className="border border-docs-border-subtle p-3 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td 
                        key={cellIndex} 
                        className="border border-docs-border-subtle p-3"
                      >
                        {cell.includes('`') ? (
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {cell.replace(/`/g, '')}
                          </code>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'callout':
        const calloutData = section.content as CalloutData;
        return (
          <div key={index} className={getCalloutClasses(calloutData.type)}>
            <h4 className="font-semibold mb-2">{calloutData.title}</h4>
            <p className="mb-0">{calloutData.content}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="docs-content">
      <h1>{content.title}</h1>
      {content.sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}

function getHeadingClasses(level?: number): string {
  const baseClasses = "font-semibold mb-4";
  switch (level) {
    case 1:
      return `text-3xl ${baseClasses}`;
    case 2:
      return `text-2xl ${baseClasses} mt-8`;
    case 3:
      return `text-xl ${baseClasses} mt-6`;
    case 4:
      return `text-lg ${baseClasses} mt-4`;
    default:
      return baseClasses;
  }
}

function getCalloutClasses(type: string): string {
  const baseClasses = "rounded-lg p-6 my-6";
  switch (type) {
    case 'tip':
      return `${baseClasses} bg-accent text-accent-foreground`;
    case 'warning':
      return `${baseClasses} bg-destructive/10 border border-destructive/20 text-destructive`;
    case 'info':
      return `${baseClasses} bg-primary/10 border border-primary/20 text-primary`;
    case 'error':
      return `${baseClasses} bg-destructive text-destructive-foreground`;
    default:
      return `${baseClasses} bg-muted text-muted-foreground`;
  }
}