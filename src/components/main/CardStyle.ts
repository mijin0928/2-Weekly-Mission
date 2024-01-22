import styled from 'styled-components';

export const CardContainer = styled.div`
  margin: 4rem 0 0;
`;

export const CardBox = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;

  
  @media screen and (min-width: 375px) and (max-width: 768px) {
    gap: 2rem;
  }
`;

export const CardImg = styled.img`
  display: block;
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

export const Text = styled.div`
  overflow: hidden;
  min-height: 11.5rem;
  padding: 1.5rem 2rem;
`;

export const Cards = styled.li`
  position: relative;
  width: calc(33.3% - 2rem);
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  border-radius: 15px;

  @media screen and (max-width: 1124px) {
    width: calc(50% - 2.4rem);
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    width: 100%;
  }

  a {
    display: block;
    overflow: hidden;
    border: 3px solid transparent;
    border-radius: 15px;

    &.active {
      border: 3px solid var(--primary);

      ${CardImg} {
        transform: scale(1.3);
        transition: transform 0.5s;
      }

      ${Text} {
        background-color: var(--bg);
      }
    }
  }
`;

export const ImgBox = styled.div`
  overflow: hidden;
  position: relative;
  height: 20rem;
`;

export const StarImg = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 3.4rem;
  height: 3.4rem;
`;

export const TimeStamp = styled.p`
  float: left;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: var(--gray-666);
`;

export const Kebab = styled.span`
  display: block;
  float: right;
  width: 2.1rem;
  height: 1.7rem;
  background: url('/image/btn-kebab.png') no-repeat;
`;

export const Desc = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  min-height: 3.8rem;
  margin: 2.1rem 0 1rem 0;
  font-size: 1.6rem;
  color: var(--black-000);
  clear: both;
`;

export const CreatedDate = styled.p`
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: var(--black-333);
`;

export const NoLink = styled.p`
  margin: 4rem 0;
  text-align: center;
  font-size: 1.6rem;
`;
