function createUserProfile() {
    const name: string = 'Anonymous';
    const age: number = 0;
    const active: boolean = true;
    const tags: string[] = [];
    let counter: number = 0;

    counter += 1;
    tags.push('default');

    return {
        name,
        age,
        active,
        tags,
        visits: counter,
    };
}
