import Link from 'next/link';
import star from '@/public/image/ico-star.png';
import Image from 'next/image';
import MainContext, { Card } from '@/src/components/main/MainContext';
import { useState, useContext } from 'react';
import { MouseEvent } from 'react';
import PopOver from '@/src/components/popOver/PopOver';
import {
  getDateText,
  getDateInfo,
  handleMouseOver,
} from '@/src/components/card/CardFunction';
import {
  NoLink,
  Cards,
  ImgBox,
  Text,
  TimeStamp,
  Desc,
  CreatedDate,
  CardImg,
  StarImg,
  Kebab,
  CardContainer,
  CardBox,
} from '@/src/components/card/CardStyle';

export default function FolderCard() {
  const { searchResult } = useContext(MainContext);
  const [popOverOpen, setPopOverOpen] = useState<string | boolean>(false);

  const handleClickKebab = (e: MouseEvent<HTMLSpanElement>, cardId: string) => {
    e.preventDefault();
    setPopOverOpen((prevOpen) => prevOpen !== cardId && cardId);
  };

  if (searchResult.length === 0) return <NoLink>저장된 링크가 없습니다</NoLink>;

  const cards = searchResult.map((card: Card) => (
    <Cards key={card?.id}>
      <Link
        href={card?.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseOver={(e) => handleMouseOver(e, true)}
        onMouseOut={(e) => handleMouseOver(e, false)}
      >
        <ImgBox>
          <CardImg
            src={card?.image_source ? card?.image_source : '/image/no-img.svg'}
            alt="카드 이미지"
          />
          <StarImg>
            <Image src={star} alt="별 이미지" />
          </StarImg>
        </ImgBox>
        <Text>
          <TimeStamp>{getDateInfo({ createdAt: card?.created_at })}</TimeStamp>
          <Kebab onClick={(e) => handleClickKebab(e, card?.id)}></Kebab>
          <Desc>{card.description}</Desc>
          <CreatedDate>
            {getDateText({ createdAt: card?.created_at })}
          </CreatedDate>
        </Text>
      </Link>
      <PopOver popOverOpen={card?.id === popOverOpen} cardUrl={card?.url} />
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
