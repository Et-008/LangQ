import "./markdown.css";

export default function BlogContent({ content }: { content: HTMLCollection }) {
  return (
    <article className="blog-content">
      <div
        // className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
