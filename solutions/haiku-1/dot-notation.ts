function getObjectProperties(obj: { name: string; age: number; email: string }): string {
  return `${obj.name} is ${obj.age} years old and can be reached at ${obj.email}`;
}

function updateProperties(obj: { name: string; age: number; email: string }): void {
  obj.name = 'Updated';
  obj.age = 30;
  obj.email = 'new@example.com';
}
