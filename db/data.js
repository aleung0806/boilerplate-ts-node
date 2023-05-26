const verbs = [
  "make",
  "read",
  "write",
  "learn",
  "water",
  "fix",
  "sell",
  "buy",
  "code",
  "test",
  "create",
];

const nouns = [
  "truck",
  "list",
  "dinner",
  "pasta",
  "beetle",
  "scooter",
  "backend",
  "frontend",
  "plants",
  "juggling",
  "sleep",
  "schedule",
];

const lists = [
  "to do",
  "in progess",
  "completed",
  "blocked",
  "things to do in the morning",
  "very very important",
];

const projects = [
  "summer tasks",
  "for the weekend",
  "everyday chores",
  "find a career",
];

const users = ["grinchie", "monkie", "shelbie", "lesa", "kushkush"];

const types = ["bug", "task", "improvement", "new feature", "epic"];

const statuses = ["to do", "done", "in progress", "in review"];

const priorities = ["highest", "high", "low", "lowest"];

const description = `do this and then that and then this and then that. don't forget to do this`;

const randomElement = (array) => {
  const element = array[Math.floor(Math.random() * array.length)];
  return element;
};

const randomIssue = () => {
  const verb = randomElement(verbs);
  const noun = randomElement(nouns);
  return `${verb} ${noun} `;
};

module.exports = {
  randomElement,
  randomIssue,
  users,
  projects,
  lists,
  statuses,
  priorities,
  types,
  description,
};
