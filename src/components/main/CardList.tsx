import styled from 'styled-components';
import PopOver from '@/src/components/popOver/PopOver';
import { useState, useContext, useEffect } from 'react';
import MainContext, { Card } from '@/src/components/main/MainContext';
import useAsync from '@/src/hook/useAsync';
import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import star from '@/public/image/ico-star.png';
import Image from 'next/image';
interface SharedCard {
  id: string;
  url: string;
  imageSource: string;
  createdAt: string;
  description: string;
}

function getDateText({ createdAt }: { createdAt: string }) {
  const idx = createdAt.indexOf('T');
  const text = createdAt.slice(0, idx);
  return text;
}

function getDateInfo({ createdAt }: { createdAt: string }) {
  const createdDate = new Date(createdAt);
  const today = new Date();
  const result = +today - +createdDate;

  const seconds = result / 1000;
  const minites = seconds / 60;
  const hours = minites / 60;
  const months = hours / 24;
  const years = months / 30;

  if (minites < 2) return '1 minites ago';
  if (minites < 60) return `${Math.floor(minites)} minutes ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (months < 30) return `${Math.floor(months)} days ago`;
  if (years < 12) return `${Math.floor(years)} months ago`;
  if (years >= 12) {
    const yearDate = Math.floor(years / 12);
    return yearDate === 1 ? '1 years ago' : `${years} years ago`;
  }
}

export default function CardList() {
  const { searchResult } = useContext(MainContext);
  const { pathname } = useRouter();
  const [popOverOpen, setPopOverOpen] = useState<string | boolean>(false);
  const [cardList, setCardList] = useState<SharedCard[]>([]);
  const [getFolderSample] = useAsync('/sample/folder', '', '', '');

  const handleClickKebab = (e: MouseEvent<HTMLSpanElement>, cardId: string) => {
    e.preventDefault();
    setPopOverOpen((prevOpen) => prevOpen !== cardId && cardId);
  };

  const handleMouseOver = (e: MouseEvent<HTMLAnchorElement>, isOver: boolean) =>
    e.currentTarget.classList[isOver ? 'add' : 'remove']('active');

  const handleLoadFolder = async () => {
    const { folder } = await getFolderSample();
    const { links } = folder;
    setCardList(links);
  };

  useEffect(() => {
    handleLoadFolder();
  }, []);

  if (searchResult.length === 0) return <NoLink>저장된 링크가 없습니다</NoLink>;

  const cards =
    pathname !== '/shared'
      ? searchResult.map((card: Card) => (
          <Cards key={card.id}>
            <Link
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseOver={(e) => handleMouseOver(e, true)}
              onMouseOut={(e) => handleMouseOver(e, false)}
            >
              <ImgBox>
                <CardImg
                  src={
                    card.image_source ? card.image_source : '/image/no-img.svg'
                  }
                  alt="카드 이미지"
                />
                <StarImg>
                  <Image src={star} alt="별 이미지" />
                </StarImg>
              </ImgBox>
              <Text>
                <TimeStamp>
                  {getDateInfo({ createdAt: card.created_at })}
                </TimeStamp>
                <Kebab onClick={(e) => handleClickKebab(e, card.id)}></Kebab>
                <Desc>{card.description}</Desc>
                <CreatedDate>
                  {getDateText({ createdAt: card.created_at })}
                </CreatedDate>
              </Text>
            </Link>
            <PopOver popOverOpen={card.id === popOverOpen} cardUrl={card.url} />
          </Cards>
        ))
      : cardList.map((card: SharedCard) => (
          <Cards key={card.id}>
            <Link
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseOver={(e) => handleMouseOver(e, true)}
              onMouseOut={(e) => handleMouseOver(e, false)}
            >
              <ImgBox>
                <CardImg
                  src={
                    card.imageSource ? card.imageSource : '/image/no-img.svg'
                  }
                  alt="카드 이미지"
                />
              </ImgBox>
              <Text>
                <TimeStamp>
                  {getDateInfo({ createdAt: card.createdAt })}
                </TimeStamp>
                <Desc>{card.description}</Desc>
                <CreatedDate>
                  {getDateText({ createdAt: card.createdAt })}
                </CreatedDate>
              </Text>
            </Link>
          </Cards>
        ));
  return (
    <>
      <CardContainer>
        <CardBox>{cards}</CardBox>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  margin: 4rem 0 0;
`;

const CardImg = styled.img`
  display: block;
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

const CardBox = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    gap: 2rem 0;
  }
`;

const Text = styled.div`
  overflow: hidden;
  min-height: 11.5rem;
  padding: 1.5rem 2rem;
`;

const Cards = styled.li`
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

const ImgBox = styled.div`
  overflow: hidden;
  position: relative;
  height: 20rem;
`;

const StarImg = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 3.4rem;
  height: 3.4rem;
`;

const Kebab = styled.span`
  display: block;
  float: right;
  width: 2.1rem;
  height: 1.7rem;
  background: url('/image/btn-kebab.png') no-repeat;
`;

const TimeStamp = styled.p`
  float: left;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: var(--gray-666);
`;

const Desc = styled.p`
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

const CreatedDate = styled.p`
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: var(--black-333);
`;

const NoLink = styled.p`
  margin: 4rem 0;
  text-align: center;
  font-size: 1.6rem;
`;