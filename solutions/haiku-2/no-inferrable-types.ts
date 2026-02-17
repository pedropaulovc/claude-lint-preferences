function createUserProfile() {
  const name = 'John Doe';
  const age = 30;
  const active = true;
  const tags: string[] = [];
  let counter = 0;

  tags.push('developer');
  counter++;

  return {
    name,
    age,
    active,
    tags,
    counter
  };
}
