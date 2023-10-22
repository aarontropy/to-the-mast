import AggregateRoot from "./core/AggregateRoot";
import { createEntityId } from "./services/IdService";

type UserId = string;

type UserProps = {
  id: string;
};

export default class User extends AggregateRoot {
  public readonly id: UserId;

  static createNew(): User {
    return new User({
      id: createEntityId("usr"),
    });
  }

  constructor(props: UserProps) {
    super();

    this.id = props.id;
  }
}
