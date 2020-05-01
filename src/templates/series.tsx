import { graphql } from 'gatsby';
import React from 'react';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  WallPosts,
} from '../styles/shared';
import { PageContext, PostFrontMatter } from './post';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import { Logo } from '../components/Logo';

interface TagTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    serieId: string;
    serie: PostFrontMatter;
    excerpt: string;
  };
  data: {
    allTagYaml: {
      edges: Array<{
        node: {
          id: string;
          description: string;
          image?: {
            childImageSharp: {
              fluid: any;
            };
          };
        };
      }>;
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    header: {
      childImageSharp: {
        fluid: any;
      };
    };
  };
}

const Tags: React.FC<TagTemplateProps> = (props) => {
  const post = props.pageContext.serie;
  const content = props.pageContext.excerpt;
  const { edges, totalCount } = props.data.allMarkdownRemark;

  return (
    <IndexLayout css={WallPosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {post.title} - {config.title}
        </title>
        <meta name="description" content={content} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${post.title} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header
          css={[outer, SiteHeader]}
          style={{
            backgroundImage: `url('${props.data.header.childImageSharp.fluid.src}')`,
          }}
        >
          <div css={inner}>
            <SiteHeaderContent>
              <Logo
                style={{ marginBottom: 15 }}
                src={props.data.logo.childImageSharp.fixed.src}
                alt={post.title}
              />
              <SiteTitle>
                <span>{post.title}</span>
              </SiteTitle>
              <SiteDescription>
                {content}
                <span>
                  A collection of {totalCount > 1 && `${totalCount} videos`}
                  {totalCount === 1 && '1 video'}
                  {totalCount === 0 && 'No videos. Coming soon...'}
                </span>
              </SiteDescription>
            </SiteHeaderContent>
            <SiteNav isHome />
          </div>
        </header>

        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($serieId: String) {
    logo: file(relativePath: { eq: "img/Universe.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/cover.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allTagYaml {
      edges {
        node {
          id
          description
          image {
            childImageSharp {
              fluid(maxWidth: 3720) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___inseries___index], order: ASC }
      filter: { frontmatter: { inseries: { series: { eq: $serieId } }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                fluid(maxWidth: 1240) {
                  ...GatsbyImageSharpFluid
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
  }
`;
