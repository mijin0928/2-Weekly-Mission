import styled from 'styled-components';
import search from '../../assets/ico-search.png';
import searchRemove from '../../assets/ico-search-remove.svg';
import mainContext from './mainContext';
import { useContext } from 'react';

const SearchBarContainer = styled.div`
  position: relative;
  margin: 4rem 0;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 1.7rem;
    top: 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    background: url('${search}') no-repeat;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.5rem 1.7rem 1.5rem 4.2rem;
  outline: none;
  border: none;
  border-radius: 1rem;
  font-size: 1.6rem;
  color: var(--gray-666);
  background-color: var(--gray-f5f5);

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 2.4rem;
    height: 2.4rem;
    background: url('${searchRemove}') no-repeat;
    cursor: pointer;

    @media screen and (min-width: 360px) and (max-width: 768px) {
      width: 1.6rem;
      height: 1.6rem;
      background-size: 1.6rem;
    }
  }
`;

const Text = styled.p<{ $searchKeyword: string }>`
  display: ${({ $searchKeyword }) => ($searchKeyword ? 'block' : 'none')};
  margin: 4rem 0 0;
  font-size: 3.2rem;
  font-weight: 600;
  color: var(--gray60);
  line-height: 3.8rem;

  span {
    color: var(--gray100);
    font-size: 3.2rem;
  }
`;

function SearchBar() {
  const { handleChangeSearch, searchKeyword } = useContext(mainContext);
  return (
    <SearchBarContainer>
      <Input
        type="search"
        placeholder="링크를 검색해 보세요."
        value={searchKeyword}
        onChange={(e) => handleChangeSearch(e)}
      />
      <Text $searchKeyword={searchKeyword}>
        <span>{searchKeyword}</span>로 검색한 결과입니다.
      </Text>
    </SearchBarContainer>
  );
}

export default SearchBar;
