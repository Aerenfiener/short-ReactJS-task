import React from 'react';
import styled from "styled-components";

import { Pagination } from "../Pagination/Pagination";
import { Item } from "../Item/Item";
import { GithubService } from "../../services/github.service";
import { GithubResponseModel } from "../../models/github.models";
import { ListStateModel } from "./List.model";

const Wrapper = styled.div`
  margin: 10px;
`;

export class List extends React.Component<any, ListStateModel> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      isLoaded: null,
      items: [],
      count: 0
    };
  }

  componentDidMount(): void {
    this.selectPage();
  }

  public selectPage = (page: number = 0) => {
    // Из-за того, что массив нумеруется с 0
    // добавим единицу для получения корректной страницы
    GithubService.getPage(page + 1)
      .then(
        (result: GithubResponseModel) => {
          this.setState({ items: result.items });
          // Гипотетически можно не обновлять кол-во страниц КАЖДЫЙ раз,
          // но я заметила, что оно меняется от запроса к запросу
          this.setState({ count: parseInt((result.total_count / 30).toFixed()) });
        },
        (error) => {
          this.setState({error});
        }
      )
  };

  render() {
    return (
      <Wrapper>
        {this.state.items.map((item, index) => (
          <Item href={item.svn_url}
                owner={item.owner.login}
                packageName={item.name}
                stars={item.stargazers_count}
                key={index}>
          </Item>
        ))}
        {this.state.count ?
          <Pagination pages={new Array(this.state.count).fill(0).map((item, index) => index)} selectPage={this.selectPage}/> :
          ""
        }
      </Wrapper>)
  };
}
