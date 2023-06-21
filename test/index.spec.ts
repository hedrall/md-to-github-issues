import { parse } from '../src/index';

test('README case', () => {
    const input = `
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
    expect(parse(input)).toMatchSnapshot();
});
