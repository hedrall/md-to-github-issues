# md-list-parser

This is a simple parser for markdown list.

# example

```ts
import * as LP from 'md-list-parser';
const input = `
- a
  - b
  - d
    - e
`;

const result = LP.parse(input);
/**
 * tobe
 * [
 * ]
 */
```
