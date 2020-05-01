import { darken, desaturate, lighten, mix } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import config from '../../website-config';

const SubscribeFormStyles = css`
  @media (max-width: 500px) {
    -ms-flex-direction: column;
    flex-direction: column;
  }
`;

const SubscribeEmail = styled.input`
  display: block;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
  color: ${colors.midgrey};
  font-size: 1.5rem;
  line-height: 37px;
  font-weight: normal;
  user-select: text;
  transition: border-color 0.15s linear;
  border: 1px solid ${colors.darkgrey};
  background: ${colors.darkgrey};

  -webkit-appearance: none;
  :focus {
    outline: 0;
    /* border-color: color(var(--lightgrey) l(-2%)); */
    border-color: ${darken('0.02', colors.midgrey)};
  }
`;

const SubscribeFormButton = styled.button`
  display: inline-block;
  margin: 0 0 0 10px;
  padding: 0 20px;
  height: 41px;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 37px;
  font-weight: 400;
  text-align: center;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
  /* background: linear-gradient(
    color(var(--blue) whiteness(+7%)),
    color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
    color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
    color(var(--blue) lightness(-4%) saturation(-10%))
  ); */
  background: ${colors.darkgrey};

  -webkit-font-smoothing: subpixel-antialiased;

  :active,
  :focus {
    /* background: color(var(--blue) lightness(-9%) saturation(-10%)); */
    background: ${desaturate('0.1', darken('0.09', colors.blue))};
  }
  @media (max-width: 500px) {
    margin: 10px 0 0;
    width: 100%;
  }
`;

const FormGroup = styled.div`
  flex-grow: 1;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SubscribeForm: React.FC = () => {
  return (
    <form
      noValidate
      css={SubscribeFormStyles}
      action={config.mailchimpAction}
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
    >
      {/* This is required for the form to work correctly  */}
      <FormGroup className="form-group">
        <SubscribeEmail
          className="subscribe-email"
          type="email"
          name={config.mailchimpEmailFieldName}
          id={config.mailchimpEmailFieldName}
          placeholder="youremail@example.com"
        />
      </FormGroup>
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input type="text" name={config.mailchimpName} tabIndex={-1} />
      </div>
      <SubscribeFormButton type="submit">
        <span>Subscribe</span>
      </SubscribeFormButton>
    </form>
  );
};

export default SubscribeForm;
