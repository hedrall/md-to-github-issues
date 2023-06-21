import { parse as _parse } from 'md-list-parser';
const input = `
    
inline 1

# heading1
## heading2

\`\`\`
    code block
\`\`\`


- (4) a
    - a-body
      - a-body-1
      - a-body-2
- (4) b
    - b-body
    - (2) b1
        - (1) b1-1
            - (b1-1-body)
        - (1) b1-2
            - b1-2-body
    - (2) b2
        - b2-body
    - b-body-2
    
    
### heading3

inline 2
`;

type Item = {
  title: string;
  paths: string[];
  depth: number;
  body: string;
  estimates: number | null;
  children: Item[];
  parents: Item[];
  isEnd: boolean;
}

const issueRegExp = /\((\d+)\).*$/;
// const transformData = (parsed: ReturnType<typeof parse>, parents: Item[] = []): Item[] => {
//   let output: Item[] = [];
//
//   parsed?.forEach(item => {
//     const {title, children} = item;
//     const paths = parents.map(p => p.title);
//     let item = {
//       title: title.replace(/\(\d+\)\s/, ''),
//       paths,
//       body: child.title,
//       estimates: Number(title.match(/\((\d+)\)/)?.[1]) || null
//     };
//
//     if (!children) return;
//
//     children.forEach(child => {
//       if (child.children) {
//         output = [...output, ...transformData([child], [...parents, item])];
//       } else {
//         output.push(item);
//       }
//     });
//   });
//
//   return output;
// };


type Structured = Exclude<ReturnType<typeof _parse>, undefined>[number];

const toMd = (parsed: Structured[], indent = 0): string => {
  return parsed.map(item => {
    const {title, children} = item;
    return [
        [' '.repeat(indent), '- ', title].join(''),
        ...(children ? [toMd(children, indent + 2)] : []),
    ].join('\n');
  }).join('\n');
};
const parseItems = (parsed: Structured[], parents: Item[] = []): Item[] => {
  return parsed.flatMap(item => {
    const { title, children } = item;
    if (!issueRegExp.test(title)) return [];
    // 親Node
    const node: Item = {
      title,
      paths: parents.map(p => p.title),
      depth: parents.length + 1,
      body: children ? toMd(children) : '',
      estimates: Number(title.match(issueRegExp)?.[1]) || null,
      parents,
      children: [],
      isEnd: false,
    };
    const childNodes = parseItems(children || [], [...parents, node]);
    node.children.push(...childNodes);
    node.isEnd = childNodes.length === 0;
    return [node, ...childNodes];
  });
}

export const parse = (input: string) => {
  const _parsed = _parse(input);
  if (!_parsed) return [];

  return parseItems(_parsed);
};

export const extractIssues = (parsed: Item[]) => {
  return parsed.filter(item => item.isEnd).map(i => {
    const {title, paths, body, estimates} = i;
    return {
      title: [...paths, title].join(' > '),
      body,
      estimates,
    }
  });
}
