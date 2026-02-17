interface Person {
  name: string;
  age: number;
  email: string;
}

function getObjectProperties(obj: Person): string {
  return `${obj.name} (${obj.age}) - ${obj.email}`;
}

function updateProperties(obj: Person): void {
  obj.name = 'Updated Name';
  obj.age = 25;
  obj.email = 'new@example.com';
}
