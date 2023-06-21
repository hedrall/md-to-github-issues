import * as MTGI from '../src/index';

const initialInput = `# Task Breakdown

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
window.addEventListener('load', () => {
    const render = (input) => {
        return MTGI.extractIssues(MTGI.parse(input));
    }
    // @ts-ignore
    document.getElementById('input').value = initialInput
    // @ts-ignore
    document.getElementById('output').value = JSON.stringify(render(initialInput), null, 2);

    // @ts-ignore
    document.getElementById('input').addEventListener('input', e => {
        console.log('test');

        try {
            // @ts-ignore
            const parsed = render(e.target.value);
            // @ts-ignore
            document.getElementById('output').value = JSON.stringify(parsed, null, 2);
        } catch (e: unknown) {
            // @ts-ignore
            document.getElementById('output').value = 'in valid';
        }
    });
});
