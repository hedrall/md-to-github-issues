import * as MTGI from '../src/index';

test('README case', () => {
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
    expect(
        MTGI.extractIssues(MTGI.parse(input))
    ).toMatchSnapshot();
});
