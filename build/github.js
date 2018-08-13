const cheerio = require('cheerio');
const fs = require('mz/fs');
const axios = require('axios');
const { minify } = require('html-minifier');
const path = require('path');

const token = process.env.GITHUB_TOKEN;

const template = items => `
  <section id="open-source">
    <div class="heading">
      <h2 class="title">Open source</h2>
      <h3 class="subtitle">My open-source initiatives and projects</h3>
    </div>

    <div class="content">
      <div class="github cards-container">
        ${items
          .map(({ node: item }) => `
          <div class="github-card">
            <h4 class="github-title">
              ${item.name}
              <a class="github-link" href="${item.url}" target="_blank" rel="noopener" aria-label="Github link to ${item.name}">
                <i class="icon-github-circled"></i>
              </a>
            </h4>
            <div class="github-content">
              <div class="github-description">${item.descriptionHTML}</div>
              <ul class="github-tags">
                ${item.repositoryTopics.edges
                  .map(({ node: edge }) => `
                  <li class="github-tag">${edge.topic.name}</li>
                `)
                  .join('')}
              </ul>
            </div>
            <div class="github-details">
              <h5 class="stars detail"><i class="icon-star"></i> ${item.stargazers.totalCount}</h5>
              <h5 class="forks detail"><i class="icon-fork"></i> ${item.forkCount}</h5>
            </div>
          </div>
        `)
          .join('')}
      </div>
    </div>
  </section>
`;

async function run() {
  try {
    const indexPath = path.resolve('dist/index.html');
    const indexHtml = await fs.readFile(indexPath, 'utf8');

    const $ = cheerio.load(indexHtml);

    const data = await axios
      .post(
        `https://api.github.com/graphql`,
        JSON.stringify({
          query: `
      query {
        user(login:"dschau") {
            repositories(first:6, orderBy:{field:STARGAZERS, direction:DESC}) {
              edges {
                node {
                  id
                  name
                  descriptionHTML
                  createdAt
                  url
                  forkCount
                  repositoryTopics(first:5) {
                    edges {
                      node {
                        topic {
                          name
                        }
                      }
                    }
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
      }
      `
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => response.data.data)
      .catch(e => console.warn(e.response.data));

    const reposHtml = minify(template(data.user.repositories.edges), {
      collapseWhitespace: true,
      removeAttributeQuotes: true
    });
    $(reposHtml).insertBefore($('section#contact'));

    await fs.writeFile(indexPath, $.html(), 'utf8');
  } catch (e) {
    console.error(e);
  }
}

run();
