function createUserProfile() {
  let name: string = "Anonymous";
  let age: number = 0;
  let active: boolean = true;
  let tags: string[] = [];
  let counter: number = 0;

  counter += 1;
  tags.push("new-user");

  if (age < 18) {
    active = false;
  }

  return {
    name,
    age,
    active,
    tags,
    counter,
  };
}
