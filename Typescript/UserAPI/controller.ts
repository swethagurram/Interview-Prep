import { Request, Response } from 'express';
import { UserRepository } from './repository';
import type { CreateUserDto, UpdateUserDto } from './types';

const repo = new UserRepository();

export const createUser = (
    req: Request<{}, {}, CreateUserDto>, //Request<requestParams, requestQuery, requestBody>
    res: Response
) => {
    const { name, email } = req.body;

    if(!name)
        return res.status(400).json({ error: `Invalid user name` });
    if(!email)
        return res.status(400).json({ error: `Invalid user email` });

    const user = repo.createUser({ name, email });
    return res.status(200).json(user);
}

export const getUserById = (
    req: Request<{ id: number }, {}, {}>,
    res: Response
) => {
    const id = Number(req.params.id);

    const user = repo.getUserById(id);
    if(!user)
        return res.status(400).json({ error: `User not found`});
    return res.status(200).json(user);
}

export const updateUser = (
    req: Request<{ id: number }, {}, UpdateUserDto>,
    res: Response
) => {
    const id = Number(req.params.id)
    
    const updated = repo.updateUser(id, req.body);
    if(!updated)
        return res.status(400).json({ error: `User not found` });
    return res.status(200).json(updated);
}

export const deleteUser = (
    req: Request<{ id: number }, {}, {}>,
    res: Response
) => {
    const id = Number(req.params.id);
    if(!id)
        return res.status(400).json({ error: `User not found` });
    
    const deleted = repo.deleteUser(id);
    return res.status(200).json(deleted);
}