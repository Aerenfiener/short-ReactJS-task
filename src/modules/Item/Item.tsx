import React from 'react';
import { ItemModel } from "./Item.model";
import styled from 'styled-components';

const Wrapper = styled.a`
  display: flex; 
  margin: 2px 0;
  padding: 4px 20px;
  display: flex;
  background: #f5f5f5;
  text-decoration: none;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  
  &:hover {
    background: #f5e1e1;
  }
`;

const Column = styled.div`
  align-items: flex-start;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.div`
  bold: 800;
  color: grey;
  font-size: 16px;
  
  @media(max-width: 400px) {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Stars = styled.div`
  color: grey;
  bold: 800;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  
  
  img {
    height: 15px;
    margin-left: 10px;
  }
`;

const Author = styled.div`
  font-size: 10px;
  color: grey;
  
`;

export function Item(props: ItemModel = {}) {
  return <Wrapper target='_blank' href={props.href}>
      <Column>
        <Title>{props.packageName}</Title>
        <Author>{props.owner}</Author>
      </Column>
      <Stars>
        <span>{props.stars}</span>
        <img src={window.location.origin + '/star.png'} alt="small star"/>
      </Stars>
    </Wrapper>
}
