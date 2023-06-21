# md-to-github-issues

This is a tool to write Github issues with markdown list.

[live demo](https://hedrall.github.io/md-to-github-issues/)

# how to use (example)

## just parse

```ts
import * as MDTI from 'md-to-github-issues';

const input = `
- (8) Implement new Feature
    - (4) Database
        - Create new table
          - \`users\` table
          - \`customers\` table
    - (4) Backend
        - Create new API
        - (2) Create user API
            - (1) implementation
                - (memo ...)
            - (1) test
                - (momo memo ...)
        - (2) Create Customer API
            - (memo memo memo ...)
`;

const result = MDTI.parse(input);
```

result like
```txt
┌─────────┬─────────────────────────┬───────────────────────────────────────────────────────────┬───────┬───────────┬───────┬────────────────────────────┐
│ (index) │          title          │                           paths                           │ depth │ estimates │ isEnd │            body            │
├─────────┼─────────────────────────┼───────────────────────────────────────────────────────────┼───────┼───────────┼───────┼────────────────────────────┤
│    0    │ 'Implement new Feature' │                            []                             │   1   │     8     │ false │ '- (4) Database\n  - C...' │
│    1    │       'Database'        │                [ 'Implement new Feature' ]                │   2   │     4     │ true  │ '- Create new table\n ...' │
│    2    │        'Backend'        │                [ 'Implement new Feature' ]                │   2   │     4     │ false │ '- Create new API\n- (...' │
│    3    │    'Create user API'    │          [ 'Implement new Feature', 'Backend' ]           │   3   │     2     │ false │ '- (1) implementation...'  │
│    4    │    'implementation'     │ [ 'Implement new Feature', 'Backend', 'Create user API' ] │   4   │     1     │ true  │       '- (memo ...)'       │
│    5    │         'test'          │ [ 'Implement new Feature', 'Backend', 'Create user API' ] │   4   │     1     │ true  │    '- (momo memo ...)'     │
│    6    │  'Create Customer API'  │          [ 'Implement new Feature', 'Backend' ]           │   3   │     2     │ true  │ '- (memo memo memo .....'  │
└─────────┴─────────────────────────┴───────────────────────────────────────────────────────────┴───────┴───────────┴───────┴────────────────────────────┘  
```

## Create Github Issue

```js
const issues = MTGI.extractIssues(
    MTGI.parse(input)
);
```

to be 

```js
const issues = [
  {
    title: 'Implement new Feature > Database',
    body: '- Create new table\n  - `users` table\n  - `customers` table',
    estimates: 4
  },
  {
    title: 'Implement new Feature > Backend > Create user API > implementation',
    body: '- (memo ...)',
    estimates: 1
  },
  {
    title: 'Implement new Feature > Backend > Create user API > test',
    body: '- (momo memo ...)',
    estimates: 1
  },
  {
    title: 'Implement new Feature > Backend > Create Customer API',
    body: '- (memo memo memo ...)',
    estimates: 2
  }
]
```
