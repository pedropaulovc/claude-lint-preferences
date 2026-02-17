function createUserProfile(overrideName?: string, overrideAge?: number) {
  let name: string = "Anonymous";
  let age: number = 25;
  let active: boolean = true;
  let tags: string[] = [];
  let counter: number = 0;

  if (overrideName) {
    name = overrideName;
    counter++;
  }

  if (overrideAge !== undefined) {
    age = overrideAge;
    counter++;
  }

  if (age < 18) {
    active = false;
    tags.push("minor");
  }

  if (active) {
    tags.push("active");
  }

  return {
    name,
    age,
    active,
    tags,
    modifications: counter,
  };
}
