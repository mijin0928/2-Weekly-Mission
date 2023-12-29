import styled from 'styled-components';
import linkIcon from '../assets/ico-link.png';

const AddLinkBarContainer = styled.div`
  padding: 6rem 0 9rem 0;
  background-color: var(--color-sky-blue);

  @media screen and (max-width: 1124px) {
    padding: 6rem 3.2rem 9rem 3.2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 2.4rem 3.2rem 4rem 3.2rem;
  }
`;

const AddLinkBarWrap = styled.div`
  position: relative;
  width: 80rem;
  margin: 0 auto;

  @media screen and (max-width: 1124px) {
    width: 100%;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: url('${linkIcon}') no-repeat;

    @media screen and (min-width: 375px) and (max-width: 768px) {
      left: 1rem;
    }
  }
`;

const AddLinkInput = styled.input`
  width: 80rem;
  padding: 2.2rem 5.2rem;
  border-radius: 15px;
  border: 1px solid var(--color-blue);
  color: var(--color-middle-gray);
  font-size: 1.6rem;
  outline: none;

  @media screen and (max-width: 1124px) {
    width: 100%;
  }

  @media screen and (min-width: 375px) and (max-width: 768px) {
    padding: 1.8rem 3.4rem;
    font-size: 1.4rem;
  }
`;

const AddLinkButton = styled.button`
  border: none;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 8rem;
  height: 3.7rem;
  cursor: pointer;
  background-image: linear-gradient(135deg, #6d6afe 0%, #6ae3fe 100%);
  border-radius: 0.8rem;
  color: var(--color-very-light-gray);
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  line-height: 3.7rem;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    right: 1rem;
  }
`;

function AddLinkBar() {
  return (
    <AddLinkBarContainer>
      <AddLinkBarWrap>
        <AddLinkInput type="text" placeholder="링크를 추가해보세요" />
        <AddLinkButton type="button">추가하기</AddLinkButton>
      </AddLinkBarWrap>
    </AddLinkBarContainer>
  );
}

export default AddLinkBar;
