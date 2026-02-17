type Person = { name: string; age: number; email: string };

function getObjectProperties(person: Person): string {
    return `Name: ${person['name']}, Age: ${person['age']}, Email: ${person['email']}`;
}

function updateProperties(person: Person, updates: Partial<Person>): void {
    if (updates['name'] !== undefined) person['name'] = updates['name'];
    if (updates['age'] !== undefined) person['age'] = updates['age'];
    if (updates['email'] !== undefined) person['email'] = updates['email'];
}
