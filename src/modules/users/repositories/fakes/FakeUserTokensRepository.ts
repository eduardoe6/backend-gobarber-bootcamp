import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { v4 } from 'uuid';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: v4(), token: v4(), userId });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
