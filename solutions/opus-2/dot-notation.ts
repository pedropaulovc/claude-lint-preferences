interface Person {
  name: string;
  age: number;
  email: string;
}

function getObjectProperties(person: Person): string {
  return `${person.name} (age ${person.age}) - ${person.email}`;
}

function updateProperties(person: Person, updates: Partial<Person>): Person {
  if (updates.name !== undefined) {
    person.name = updates.name;
  }
  if (updates.age !== undefined) {
    person.age = updates.age;
  }
  if (updates.email !== undefined) {
    person.email = updates.email;
  }
  return person;
}
