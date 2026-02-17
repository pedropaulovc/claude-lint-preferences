function getObjectProperties(obj: { name: string; age: number; email: string }): string {
  return `Name: ${obj.name}, Age: ${obj.age}, Email: ${obj.email}`;
}

function updateProperties(obj: { name: string; age: number; email: string }, name: string, age: number, email: string): void {
  obj.name = name;
  obj.age = age;
  obj.email = email;
}
