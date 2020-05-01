const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  if (node.internal.type === 'MarkdownRemark') {
    const { permalink, layout, primaryTag, series } = node.frontmatter;
    const { relativePath } = getNode(node.parent);

    let slug = permalink;

    if (!slug) {
      slug = `/${relativePath.replace('.md', '')}/`;
      if (series) {
        slug = `/${slug.split('/').slice(0, -2).join('/')}/`;
      }
    }

    // Used to generate URL to view this content.
    createNodeField({
      node,
      name: 'slug',
      value: slug || '',
    });

    // Used to determine a page layout.
    createNodeField({
      node,
      name: 'layout',
      value: layout || '',
    });

    createNodeField({
      node,
      name: 'primaryTag',
      value: primaryTag || '',
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            excerpt
            timeToRead
            frontmatter {
              title
              tags
              date
              draft
              series {
                id
              }
              inseries {
                index
                series
              }
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                  }
                }
              }
              author {
                id
                bio
                avatar {
                  children {
                    ... on ImageSharp {
                      fixed(quality: 90) {
                        src
                      }
                    }
                  }
                }
              }
            }
            fields {
              layout
              slug
            }
          }
        }
      }
      allAuthorYaml {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = result.data.allMarkdownRemark.edges.filter((p) => !p.node.frontmatter.series);

  // Create paginated index
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ node }) => {
    const { slug, layout } = node.fields;
    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
        serie: node.frontmatter.inseries ? node.frontmatter.inseries.series : '',
      },
    });
  });

  // Create tag pages
  const seriesTemplate = path.resolve('./src/templates/series.tsx');
  const series = result.data.allMarkdownRemark.edges.filter((edge) =>
    Boolean(edge.node.frontmatter.series),
  );
  series.forEach((serie) => {
    createPage({
      path: `/series/${_.kebabCase(serie.node.frontmatter.series.id)}/`,
      component: seriesTemplate,
      context: {
        serieId: serie.node.frontmatter.series.id,
        serie: serie.node.frontmatter,
        excerpt: serie.node.excerpt,
      },
    });
  });

  // Create author pages
  const authorTemplate = path.resolve('./src/templates/author.tsx');
  result.data.allAuthorYaml.edges.forEach((edge) => {
    createPage({
      path: `/author/${_.kebabCase(edge.node.id)}/`,
      component: authorTemplate,
      context: {
        author: edge.node.id,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
