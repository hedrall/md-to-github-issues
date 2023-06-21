import * as MTGI from '../src/index';

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

console.table(
    MTGI.parse(input).map(i =>{
        const {body, parents, children, ...rest} = i;
        let shortBody = body.slice(0, 20);
        return {
            ...rest,
            body: shortBody + (shortBody.length === 20 ? '...' : ''),
        }
    })
)
console.log(
    MTGI.extractIssues(
        MTGI.parse(input)
    )
)
