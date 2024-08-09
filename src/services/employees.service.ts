import { CreateEmployeeDto } from '@dtos/employees.dto';
import { Employee } from '@interfaces/employees.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import EmployeeRepository from '@repositories/employees.repository';

class EmployeeService {
  private employeeRepository = new EmployeeRepository();

  public async findAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }

  public async findEmployeeById(employeeId: string): Promise<Employee> {
    if (isEmpty(employeeId)) throw new HttpException(400, 'EmployeeId is empty');

    const findEmployee: Employee = await this.employeeRepository.findById(employeeId);
    if (!findEmployee) throw new HttpException(409, "Employee doesn't exist");

    return findEmployee;
  }

  public async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(employeeData)) throw new HttpException(400, 'employeeData is empty');

    const createEmployeeData: Employee = await this.employeeRepository.create(employeeData);

    return createEmployeeData;
  }

  public async updateEmployee(employeeId: string, employeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(employeeData)) throw new HttpException(400, 'employeeData is empty');

    const updateEmployeeById: Employee = await this.employeeRepository.update(employeeId, employeeData);
    if (!updateEmployeeById) throw new HttpException(409, "Employee doesn't exist");

    return updateEmployeeById;
  }

  public async deleteEmployee(employeeId: string): Promise<Employee> {
    const deleteEmployeeById: Employee = await this.employeeRepository.delete(employeeId);
    if (!deleteEmployeeById) throw new HttpException(409, "Employee doesn't exist");

    return deleteEmployeeById;
  }

  public async findEmployeesByDepartmentId(departmentId: string): Promise<Employee[]> {
    return this.employeeRepository.findEmployeesByDepartmentId(departmentId);
  }
}

export default EmployeeService;
