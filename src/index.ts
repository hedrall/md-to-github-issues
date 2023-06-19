import MarkdownIt from 'markdown-it';
import * as fs from "fs";
import * as path from "path";

const md = new MarkdownIt();

type ListItem = {
    inline: string,
    body: string[],
    children: ListItem[],
}

type Token = {
    index: number,
    type: string,
    content: string,
    markup: string,
};

type ListNodeTypes = 'paragraph' | 'bullet_list' | 'list_item';
const LIST_NODE_TYPE_COL_NAME_MAP = {
    paragraph: 'paragraphs',
    bullet_list: 'bulletLists',
    list_item: 'listItems',
} as const;

const pickTokensOf = (type: string, tokens: Token[], indexOfOpen: number) => {
    let index = indexOfOpen + 1;
    let count = 1;
    while(count > 0) {
        const token = tokens[index];
        if (token.type ===  `${type}_open`) count++;
        if (token.type ===  `${type}_close`) count--;
        index++;
    }
    const indexOfClose = index - 1;
    return {
        items: tokens.slice(indexOfOpen + 1, indexOfClose),
        indexOfClose,
    };
}

// group by paragraph or bullet_list or list_item
const groupBy = (tokens: Token[]) => {
    const res = {
        paragraphs: [] as Token[][],
        bulletLists: [] as Token[][],
        listItems: [] as Token[][],
    }
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const type = token.type.match(/(paragraph|bullet_list|list_item)_open/)?.[1] as null | ListNodeTypes;

        if (type) {
            const {items, indexOfClose} = pickTokensOf(type, tokens, i);
            res[LIST_NODE_TYPE_COL_NAME_MAP[type]].push(items);
            i = indexOfClose;
        }
    }
    return res;
}

type ParsedList = {
    paragraphs: Token[][],
    bulletLists: ParsedList[],
    listItems: ParsedList[],
}

function getContentOfParagraphs(paragraphs: Token[]) {
    return paragraphs.map(p => p.content).join('\n');
}

// 構造化する
type Structured = {
    title: string,
    children?: Structured[] | null,
}
const structure = (parsed: ParsedList): Structured => {
    const type = parsed.bulletLists.length ? 'has-bullet-list' : parsed.listItems.length ? 'has-list-item' : 'has-paragraph';
    if (type === 'has-bullet-list') {
        return {
            title: parsed.paragraphs.map(getContentOfParagraphs).join('\n'),
            children: parsed.bulletLists.flatMap(bl => bl.listItems.map(structure))
        };
    }
    if (type === 'has-list-item') {
        return {
            title: '',
            children: parsed.listItems.map(structure)
        };
    }
    return {
        title: parsed.paragraphs.map(getContentOfParagraphs).join('\n'),
    };
}

const parse = (tokens: Token[]): ParsedList => {
    const groups = groupBy(tokens);
    return {
        ...groups,
        bulletLists: groups.bulletLists.map(parse),
        listItems: groups.listItems.map(parse),
    }
}

export const parseMarkdownList = (input: string, noEmit = false) => {
    // tokenize
    const tokens = md.parse(input, {}).map((token, index) => {
        return {
            index,
            type: token.type,
            content: token.content,
            markup: token.markup,
        };
    });
    if (!noEmit) fs.writeFileSync(path.resolve(__dirname, './tokens.json'), JSON.stringify(tokens, null, 2));

    // parse to ast like
    const res = parse(tokens);
    if (!noEmit) fs.writeFileSync(path.resolve(__dirname, './res.json'), JSON.stringify(res, null, 2));

    const res2 = structure(res);
    if (!noEmit) fs.writeFileSync(path.resolve(__dirname, './res2.json'), JSON.stringify(res2, null, 2));
    return res2;
};
