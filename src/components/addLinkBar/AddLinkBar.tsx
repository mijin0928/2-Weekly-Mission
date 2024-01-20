import styled from 'styled-components';
import { ChangeEvent, useContext, useState, useRef, useEffect } from 'react';
import ModalContext from '@/src/components/modal/ModalContext';

export default function AddLinkBar() {
  const { handleClickModalOpen } = useContext(ModalContext);
  const [linkValue, setLinkValue] = useState<string>('');

  const handleChangeLinkValue = (e: ChangeEvent<HTMLInputElement>) =>
    setLinkValue(e.target.value);

  const addLinkBarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!addLinkBarRef.current) return;

      if (!entry.isIntersecting) {
        addLinkBarRef.current.classList.add('active');
      }
      if (entry.target === footerRef.current) {
        addLinkBarRef.current.classList.remove('active');

        if (addLinkBarRef.current) observer.unobserve(addLinkBarRef.current);
      }
    }, options);

    if (addLinkBarRef.current) observer.observe(addLinkBarRef.current);

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [addLinkBarRef]);

  return (
    <>
      <AddLinkBarContainer ref={addLinkBarRef}>
        <Input
          type="text"
          placeholder="링크를 추가해보세요"
          onChange={handleChangeLinkValue}
          value={linkValue}
        />
        <Button
          type="button"
          onClick={() => linkValue && handleClickModalOpen('folderAdd')}
        >
          추가하기
        </Button>
      </AddLinkBarContainer>
      <FooterFoint ref={footerRef}></FooterFoint>
    </>
  );
}

const AddLinkBarContainer = styled.div`
  position: relative;
  width: 80rem;
  margin: 0 auto;
  padding: 6rem 0 9rem 0;
  background-color: var(--bg);

  &.active {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 1;
    width: 100%;
    padding: 2.4rem 3.2rem;
    background-color: var(--bg);
  }

  @media screen and (max-width: 1124px) {
    padding: 6rem 3.2rem 9rem 3.2rem;
    width: 100%;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 2.4rem 3.2rem 4rem 3.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 2.2rem 5.2rem;
  border-radius: 15px;
  border: 1px solid var(--primary);
  color: var(--gray60);
  font-size: 1.6rem;
  outline: none;
  background: url('/image/ico-link.png') no-repeat 2rem center var(--white);

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 1.8rem 4.4rem;
    font-size: 1.4rem;
    background: url('/image/ico-link.png') no-repeat 1.6rem center var(--white);
  }
`;

const Button = styled.button`
  border: none;
  position: absolute;
  right: 2rem;
  top: 7.5rem;
  display: block;
  width: 8rem;
  height: 3.7rem;
  cursor: pointer;
  background-image: linear-gradient(135deg, #6d6afe 0%, #6ae3fe 100%);
  border-radius: 0.8rem;
  color: var(--gray-f5f5);
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  line-height: 3.7rem;

  @media screen and (max-width: 1124px) {
    right: 5.2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    top: 3.2rem;
  }
`;

const FooterFoint = styled.div`
  position: absolute;
  top: 900px;
`;
