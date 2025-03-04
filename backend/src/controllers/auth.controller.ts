import { Request, RequestHandler, Response } from "express";
import userModel from "../models/user.model";

export const Login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body

    if (!username) {
        res.status(422).send({ message: 'username is missing' })
        return
    }

    if (!password) {
        res.status(422).send({ message: 'password is missing' })
        return
    }



}

export const Signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, name, lastname } = req.body;

    if (!username) {
        res.status(422).send({ message: 'username is missing' })
        return
    }

    if (!email) {
        res.status(422).send({ message: 'email is missing' })
        return
    }

    if (!password) {
        res.status(422).send({ message: 'password is missing' })
        return
    }

    if (!name) {
        res.status(422).send({ message: 'name is missing' })
        return
    }

    if (!lastname) {
        res.status(422).send({ message: 'lastname is missing' })
        return
    }

    const fullname = name + ' ' + lastname;

    const user = userModel.create({
        name: `${name}`,
        Lastname: `${lastname}`,
        fullname: `${fullname}`,
        email: `${email}`,
        password: `${password}`,
        username: `${username}`
    });

    res.status(201).json({ message: 'User successfully created', id: (await user)._id });
}