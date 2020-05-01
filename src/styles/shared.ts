import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from './colors';
import { darken, lighten } from 'polished';

export const outer = css`
  position: relative;
  padding: 0 4vw;
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

export const SiteMain = css`
  z-index: 100;
  flex-grow: 1;
`;

export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0;
  padding: 0;
  font-size: 3.8rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 1.8rem;
  line-height: 1.5;
  font-weight: 300;
  opacity: 0.8;
  max-width: 480px;
`;

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

export const PostFeedRaise = css`
  @media (min-width: 900px) {
    margin-top: -70px;
    padding-top: 0;
  }
`;

export const SocialLink = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 10px;
  color: #fff;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SiteHeader = css`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  /* background: color(var(--darkgrey) l(-5%)) no-repeat center center; */
  background: ${darken('0.05', colors.darkgrey)} no-repeat center center;
  background-size: cover;
  background-position: bottom;
`;

export const SiteHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 4vw;
  min-height: 200px;
  max-height: 500px;
  text-align: center;
`;

export const SiteHeaderStyles = css`
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  z-index: 10;
  display: block;
  height: 80px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }

  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 80px;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  }
  @media (max-width: 700px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const AuthorProfileImage = css`
  display: block;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;
  margin-right: 15px;
  width: 60px;
  height: 60px;
`;

export const WallPosts = css`
  @media (min-width: 795px) {
    .post-card:nth-of-type(2n + 1):not(.no-image) {
      flex-direction: row-reverse;
    }
    .post-card:not(.no-image) {
      flex: 1 1 100%;
      flex-direction: row;
    }

    .post-card:not(.no-image) .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      border-radius: 5px 0 0 5px;
    }

    .post-card:not(.no-image) .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card:not(.no-image) .post-card-content {
      flex: 0 1 257px;
    }

    .post-card:not(.no-image) h2 {
      font-size: 1.6rem;
    }

    .post-card:not(.no-image) p {
      font-size: 1.2rem;
      line-height: 1.55em;
    }

    .post-card:not(.no-image) .post-card-content-link {
      padding: 30px 40px 0;
    }

    .post-card:not(.no-image) .post-card-meta {
      padding: 0 40px 30px;
    }
  }
`;
