// Turns a paragraph holding a single image with a title — ![alt](src "caption") —
// into <figure><img><figcaption>caption</figcaption></figure>.
export default function rehypeFigure() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => toFigure(child) ?? child);
  node.children.forEach(walk);
}

function toFigure(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const meaningful = node.children.filter((c) => !(c.type === 'text' && c.value.trim() === ''));
  if (meaningful.length !== 1) return null;
  const img = meaningful[0];
  if (img.type !== 'element' || img.tagName !== 'img') return null;

  const caption = img.properties?.title;
  if (!caption) return null;
  delete img.properties.title;

  return {
    type: 'element',
    tagName: 'figure',
    properties: {},
    children: [
      img,
      { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(caption) }] },
    ],
  };
}
