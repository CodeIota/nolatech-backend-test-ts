import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';

class UserRepository {
  private userModel = userModel;

  public async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  public async findById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ _id: userId });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  public async create(userData: Partial<User>): Promise<User> {
    return this.userModel.create(userData);
  }

  public async update(userId: string, userData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(userId, userData, { new: true });
  }

  public async delete(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId);
  }
}

export default UserRepository;
