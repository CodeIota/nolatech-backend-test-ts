import { NextFunction, Request, Response } from 'express';
import { CreateEmployeeDto } from '@dtos/employees.dto';
import { Employee } from '@interfaces/employees.interface';
import EmployeeService from '@services/employees.service';

class EmployeesController {
  public employeeService = new EmployeeService();

  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEmployeesData: Employee[] = await this.employeeService.findAllEmployees();
      res.status(200).json({ data: findAllEmployeesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;
      const findOneEmployeeData: Employee = await this.employeeService.findEmployeeById(employeeId);
      res.status(200).json({ data: findOneEmployeeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeData: CreateEmployeeDto = req.body;
      const createEmployeeData: Employee = await this.employeeService.createEmployee(employeeData);
      res.status(201).json({ data: createEmployeeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;
      const employeeData: CreateEmployeeDto = req.body;
      const updateEmployeeData: Employee = await this.employeeService.updateEmployee(employeeId, employeeData);
      res.status(200).json({ data: updateEmployeeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;
      const deleteEmployeeData: Employee = await this.employeeService.deleteEmployee(employeeId);
      res.status(200).json({ data: deleteEmployeeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeesController;
