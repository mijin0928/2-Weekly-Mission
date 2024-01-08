import styled from 'styled-components';
import addFolder from '../assets/btn-add-folder.svg';

const AddFolderButton = styled.button`
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  border: none;
  background-color: transparent;

  @media screen and (min-width: 375px) and (max-width: 768px) {
    position: fixed;
    left: 50%;
    bottom: 10.1rem;
    transform: translateX(-50%);
    z-index: 1;
    border: none;
    width: 13.5rem;
    height: 3.6rem;
    border-radius: 2rem;
    border: 1px solid var(--white);
    cursor: pointer;
    background-color: var(--primary);

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 1rem;
      right: 2.4rem;
      border: none;
      width: 1.6rem;
      height: 1.6rem;
      background: url('${addFolder}') no-repeat;
    }
  }
`;

function AddFolder() {
  return <AddFolderButton type="button">폴더 추가</AddFolderButton>;
}

export default AddFolder;
