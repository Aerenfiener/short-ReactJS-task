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

const Error = styled.div`
  text-align: center;
  color: red;
  bold: 900;
  margin-bottom: 50px;
`;

const Loading = styled.div`
  justify-content: center;
  height: 100vh;
  display: flex;
  align-items: center;
`;

export class List extends React.Component<any, ListStateModel> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      isLoaded: null,
      items: [],
    };
  }

  componentDidMount(): void {
    this.selectPage();
  }

  public selectPage = (page: number = 0) => {
    this.setState({isLoaded: true});

    // Из-за того, что массив нумеруется с 0
    // добавим единицу для получения корректной страницы
    GithubService.getPage(page + 1)
      .then(
        (result: GithubResponseModel) => {
          this.setState({ error: null, items: result.items, isLoaded: false });
        }).catch(() => {
          this.setState({ error: 'Please try later!', isLoaded: false });
        }
      )
  };

  render() {
    return (
      <Wrapper>
        {  this.state.isLoaded ?
          <Loading>Loading...</Loading> :
          <div>
            {
              this.state.error ?
                <Error>{this.state.error}</Error> :
                this.state.items.map((item) => (
                  <Item href={item.svn_url}
                        owner={item.owner.login}
                        packageName={item.name}
                        stars={item.stargazers_count}
                        key={item.id}>
                  </Item>
                ))
            }
            {this.state.items.length ?
              <Pagination selectPage={this.selectPage}/> :
              ""
            }
          </div>
        }
      </Wrapper>)
  };
}
