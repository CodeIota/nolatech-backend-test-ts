import { Employee } from '@interfaces/employees.interface';
import employeeModel from '@models/employee.model';

class EmployeeRepository {
  private employeeModel = employeeModel;

  public async findAll(): Promise<Employee[]> {
    return this.employeeModel.find();
  }

  public async findById(employeeId: string): Promise<Employee | null> {
    return this.employeeModel.findOne({ _id: employeeId });
  }

  public async create(employeeData: Partial<Employee>): Promise<Employee> {
    return this.employeeModel.create(employeeData);
  }

  public async update(employeeId: string, employeeData: Partial<Employee>): Promise<Employee | null> {
    return this.employeeModel.findByIdAndUpdate(employeeId, employeeData, { new: true });
  }

  public async delete(employeeId: string): Promise<Employee | null> {
    return this.employeeModel.findByIdAndDelete(employeeId);
  }

  public async findEmployeesByDepartmentId(departmentId: string): Promise<Employee[]> {
    return this.employeeModel.find({ department: departmentId });
  }
}

export default EmployeeRepository;
