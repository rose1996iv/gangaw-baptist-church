import React, { Fragment } from 'react'

export function renderRichTextNode(node: any, i: number): React.ReactNode {
  if (!node) return null

  if (node.text !== undefined) {
    let el: React.ReactNode = node.text
    if (node.bold) el = <strong key={i}>{el}</strong>
    if (node.italic) el = <em key={i}>{el}</em>
    if (node.underline) el = <u key={i}>{el}</u>
    if (node.strikethrough) el = <del key={i}>{el}</del>
    if (node.code) el = <code key={i} className="bg-gray-100 rounded px-1 py-0.5">{el}</code>
    return <Fragment key={i}>{el}</Fragment>
  }

  const children = node.children?.map((n: any, j: number) => renderRichTextNode(n, j))

  switch (node.type) {
    case 'h1': return <h1 key={i}>{children}</h1>
    case 'h2': return <h2 key={i}>{children}</h2>
    case 'h3': return <h3 key={i}>{children}</h3>
    case 'h4': return <h4 key={i}>{children}</h4>
    case 'h5': return <h5 key={i}>{children}</h5>
    case 'h6': return <h6 key={i}>{children}</h6>
    case 'blockquote': return <blockquote key={i} className="border-l-4 border-gold-500 pl-4 italic my-4 text-gray-700">{children}</blockquote>
    case 'ul': return <ul key={i} className="list-disc pl-6 my-4">{children}</ul>
    case 'ol': return <ol key={i} className="list-decimal pl-6 my-4">{children}</ol>
    case 'li': return <li key={i} className="mb-1">{children}</li>
    case 'link':
      return (
        <a href={node.url} key={i} target={node.newTab ? '_blank' : undefined} className="text-navy-600 hover:text-gold-600 underline">
          {children}
        </a>
      )
    case 'upload':
      return (
        <div key={i} className="my-6">
          <img src={node.value?.url} alt={node.value?.alt || ''} className="w-full h-auto rounded-lg" />
        </div>
      )
    case 'indent':
      return <div key={i} className="ml-8">{children}</div>
    default:
      return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{children}</p>
  }
}

export function RichText({ content }: { content: any }) {
  if (!content) return null
  if (Array.isArray(content)) {
    return <>{content.map((n, i) => renderRichTextNode(n, i))}</>
  }
  return <>{renderRichTextNode(content, 0)}</>
}
