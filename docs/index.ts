import * as MTGI from '../src/index';

const initialInput = `# Title

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
