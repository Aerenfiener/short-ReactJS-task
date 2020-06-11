import { GithubResponseItemModel } from "../../models/github.models";

export class ListStateModel {
  error: string;
  isLoaded: boolean;
  items: GithubResponseItemModel[];
  count: number;
}
