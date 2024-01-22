import Link from 'next/link';
import MainContext, { Card } from '@/src/components/main/MainContext';
import { useState, useContext, useEffect } from 'react';
import useAsync from '@/src/hook/useAsync';
import { useRouter } from 'next/router';
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
  CardContainer,
  CardBox
} from '@/src/components/card/CardStyle';

export default function SharedCard() {
  const { userId } = useContext(MainContext);
  const [cardList, setCardList] = useState<Card[]>([]);

  const router = useRouter();
  const { id } = router.query;
  const [getFolderLink] = useAsync({
    baseUrl: `/users/25/links?folderId=`,
    folderId: id,
  });

  const handleLoadLinkList = async () => {
    const { data } = await getFolderLink();
    setCardList(data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    handleLoadLinkList();
  }, [router.isReady]);

  if (cardList.length === 0) return <NoLink>저장된 링크가 없습니다</NoLink>;

  const cards = cardList.map((card: Card) => (
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
            src={card.image_source ? card.image_source : '/image/no-img.svg'}
            alt="카드 이미지"
          />
        </ImgBox>
        <Text>
          <TimeStamp>{getDateInfo({ createdAt: card.created_at })}</TimeStamp>
          <Desc>{card.description}</Desc>
          <CreatedDate>
            {getDateText({ createdAt: card.created_at })}
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
