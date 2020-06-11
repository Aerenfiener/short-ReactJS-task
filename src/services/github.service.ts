import { GithubResponseModel } from "../models/github.models";

export const GithubService =  {
  getPage: function(page = 0): Promise<GithubResponseModel> {
    return fetch(`https://api.github.com/search/repositories?q=language=javascript&sort=stars&order=desc&page=${page}`)
      .then(res => res.json());
  }
};
