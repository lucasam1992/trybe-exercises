const fetch = require('node-fetch');

const getRepos = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return data.map((repo) => repo.name);
    });
}

it('verificar se reps encontram-se nessa lista', async () => {
    const urlRep = 'https://api.github.com/orgs/tryber/repos';
    expect.assertions(2);
    const verificar = await getRepos(urlRep);
    expect(verificar).toContain('sd-01-week4-5-project-todo-list');
    expect(verificar).toContain('sd-01-week4-5-project-meme-generator');
});