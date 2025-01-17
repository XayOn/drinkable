import { StaticTagModel, TagModel } from 'domain/entities/cocktail-tag';

export enum Tag {
    IBA = '1',
    FormerIBA = '2',
    TheUnforgettables = '3',
    ContemporaryClassics = '4',
    NewEraDrinks = '5'
}

const tags: StaticTagModel[] = [
    { id: Tag.IBA, translation: 'tag-list.iba' },
    { id: Tag.FormerIBA, translation: 'tag-list.former-iba' },
    { id: Tag.TheUnforgettables, translation: 'tag-list.the-unforgettables' },
    { id: Tag.ContemporaryClassics, translation: 'tag-list.contemporary-classics' },
    { id: Tag.NewEraDrinks, translation: 'tag-list.new-era-drinks' }
];

export function getTags() {
    return tags;
}

export function getTagsFromIds(ids: string[]): TagModel[] {
    return ids?.map(id => tags.find(tag => tag.id === id)).filter(x => x !== undefined);
}
