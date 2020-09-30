import { Request, Response } from 'express';
import Person from './person.model';

export const getPerson = async (req: Request, res: Response): Promise<Response> => {
    try {
        const person = await Person.findOne(req.query, { _id: 0, name: 1, count: 1 });
        return res.json(person);
    } catch {
        return res.status(500).send();
    }
};
