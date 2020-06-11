import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { PaginationPropsModel } from "./Pagination.model";

const PaginatorWrapper = styled.div`
  width: 100wh;
  height: 60px;
  overflow: hidden;
 
`;

const PaginationList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
`;

const StyledComp = styled.div`
  cursor: pointer;
  width: 30px;
  text-align: center;
  padding: 10px;
  color: white;
  margin: 5px;
  border-radius: 4px;
  height: 20px;
  background: ${(props: {isCurrent: boolean}) => (props.isCurrent ? '#ff7777' : '#b5b5b5')};
  
  &:hover {
    background:  ${(props: {isCurrent: boolean}) => (props.isCurrent ? '#ff7777' : 'grey')};
  }
`;

const Page = ({isCurrent, pageNumber}: {isCurrent: boolean, pageNumber: number}) => (
  <StyledComp isCurrent={ isCurrent  }>{ pageNumber + 1 }</StyledComp>
);

export function Pagination(props: PaginationPropsModel) {
    const [page, setPage] = useState(0);

    const changePage = (item: number) => {
      setPage(item);
      props.selectPage(item);
    };


    return <PaginatorWrapper>
      <PaginationList>
      {props.pages.map((item: number) =>
        <div key={ item } onClick={() => changePage(item)}>
          <Page pageNumber={ item } isCurrent={ page === item }/>
        </div>
      )}
      </PaginationList>
    </PaginatorWrapper>
}

