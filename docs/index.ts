import { parse } from '../src/index';

const initialInput = `# Title

- a
  - b
  - d
    - e
- f
`;
window.addEventListener('load', () => {
    // @ts-ignore
    document.getElementById('input').value = initialInput
    // @ts-ignore
    document.getElementById('output').value = JSON.stringify(parse(initialInput), null, 2);

    // @ts-ignore
    document.getElementById('input').addEventListener('input', e => {
        console.log('test');

        try {
            // @ts-ignore
            const parsed = parse(e.target.value);
            // @ts-ignore
            document.getElementById('output').value = JSON.stringify(parsed, null, 2);
        } catch (e: unknown) {
            // @ts-ignore
            document.getElementById('output').value = 'in valid';
        }
    });
});
