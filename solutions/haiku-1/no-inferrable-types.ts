function createUserProfile() {
  const name = 'John';
  const age = 25;
  const active = true;
  const tags: string[] = [];
  let counter = 0;

  counter = tags.length + 1;

  return {
    name,
    age,
    active,
    tags,
    counter
  };
}
