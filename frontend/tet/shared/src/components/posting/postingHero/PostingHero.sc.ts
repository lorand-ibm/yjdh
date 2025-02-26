// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

interface ImageProps {
  imageUrl: string;
}

export const $PostingHero = styled.div`
  background-color: ${(props) => props.theme.colors.black10};
  width: 100%;
`;

export const $HeroWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: nowrap;
  }
`;

export const $BackButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.xs3};
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakpoints.xl}) {
    left: -3rem;
    padding: ${(props) => props.theme.spacing.xs2};
  }
`;

export const $ImageContainer = styled.div<ImageProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.black30};
  background-size: cover;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    width: 60%;
  }
`;

export const $HeroContentWrapper = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding: ${(props) => props.theme.spacing.l};
    width: 40%;
  }
`;

export const $Keywords = styled.ul`
  display: inline-flex;
  flex-flow: row wrap;
  list-style: none;
  padding-left: 0;
  margin-top: 0;

  li {
    margin-right: ${(props) => props.theme.spacing.xs};
    margin-top: ${(props) => props.theme.spacing.xs};
  }
`;

export const $Title = styled.h1`
  font-size: ${(props) => props.theme.fontSize.heading.l};
`;

export const $Subtitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.body.m};
`;
export const $Date = styled.div`
  font-size: ${(props) => props.theme.fontSize.body.l};
  font-weight: normal;
`;

export const $Spots = styled.div`
  font-size: ${(props) => props.theme.fontSize.body.l};
  font-weight: normal;
  margin-top: ${(props) => props.theme.spacing.m};
`;

export const $ContactTitle = styled.div`
  margin-top: ${(props) => props.theme.spacing.m};
  font-size: ${(props) => props.theme.fontSize.body.l};
  font-weight: bold;
`;

export const $ContactInfo = styled.ul`
  padding-left: 0;
  list-style: none;

  li {
    font-size: ${(props) => props.theme.fontSize.body.l};
    line-height: 1.4;
  }
`;

export const $Address = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.m};
`;
