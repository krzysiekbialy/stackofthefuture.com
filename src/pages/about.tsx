import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';

const PageTemplate = css`
  .site-main {
    background: #000;
    padding-bottom: 4vw;
  }
`;

const Bio = styled.div`
  padding: 4vw;
  background: #ffffff11;
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About the author</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <Bio>
                Hello! My name is Artur Czemiel and I am a programming passionate. All the time I am
                trying to find the holy grail of full stack development. Many tried and many failed.
                However I think there is a possibility of creation of complicated systems that allow
                to deploy full stack web systems in very short time. This of course wouldnt be
                possible without graphsourcing which means creating the system basing on initial
                graph. That also means that every application should start from graph and the more
                you spend on desiging graph describing your application the better results you can
                achieve in shorter time. If anybody reading this shares the same idea I am open to
                contributions to this blog and the software I make.
              </Bio>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
