export default class Note {
    constructor(
        id: string,
        title: string,
        create_time: string,
        modification_time: string,
        content: string | undefined
    ) {
        this.id = id;
        this.title = title;
        this.create_time = create_time;
        this.modification_time = modification_time;
        this.content = content;
    }
    id: string;
    title: string;
    create_time: string;
    modification_time: string;
    content: string | undefined;
}
