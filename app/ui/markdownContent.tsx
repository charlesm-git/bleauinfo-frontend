import ReactMarkdown from "react-markdown";
import { ContentKey, getContent } from "~/content";
import { TypoH1, TypoH2, TypoH3, TypoP } from "./typography";

export function MarkdownContent({ contentKey }: { contentKey: ContentKey }) {
  return (
    <div>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <TypoH1>{children}</TypoH1>,
          h2: ({ children }) => <TypoH2>{children}</TypoH2>,
          h3: ({ children }) => <TypoH3>{children}</TypoH3>,
          p: ({ children }) => <TypoP>{children}</TypoP>,
          ul: ({ children }) => <ul className="list-disc space-y-1 ml-4 mb-2">{children}</ul>,
        }}>
        {`${getContent(contentKey)}`}
      </ReactMarkdown>
    </div>
  );
}
