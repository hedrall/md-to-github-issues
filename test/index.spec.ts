import { parse } from '../src/index';

test('README case', () => {
    const input = `
- a
  - b
  - d
    - e
- f
`;
    expect(parse(input)).toMatchSnapshot();
});

test('main case', () => {
    const input = `
- (4) a
    - a-body
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
`;
    expect(parse(input)).toMatchSnapshot();
});

test('mixed with other markdown', () => {
    const input = `
    
inline 1

# heading1
## heading2

\`\`\`
    code block
\`\`\`


- (4) a
    - a-body
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
    expect(parse(input)).toMatchSnapshot();
});

test('two lists', () => {
    const input = `
# one

- 1
    - 2
    - 3

# two

- a
- b
    - c 
`;
    expect(parse(input)).toMatchSnapshot();
});

test('+ list', () => {
    const input = `
+ 1
    + 2
    + 3
`;
    expect(parse(input)).toMatchSnapshot();
});

test('num list', () => {
    const input = `
1. a
1. b
    1. c
`;
    expect(parse(input)).toBe(undefined);
});
