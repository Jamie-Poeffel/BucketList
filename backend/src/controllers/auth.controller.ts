import { Request, RequestHandler, Response } from "express";
import userModel, { Visibility } from "../models/user.model";
import { authenticateUser } from "../services/auth.service";

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

    await authenticateUser(res, username, password)
}

export const Signup: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, name, lastname, visibility, profilePicture, bio, socialLinks } = req.body;

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

    if (visibility) {
        if (visibility !== Visibility.PUBLIC || visibility !== Visibility.PRIVATE || visibility !== Visibility.FRIENDS_ONLY)
            res.status(422).send({ message: `visibility can not be ${visibility} it has to be one of these ${Visibility.PUBLIC}, ${Visibility.PRIVATE}, ${Visibility.FRIENDS_ONLY}` })
        return
    }

    if (socialLinks) {
        if (typeof socialLinks !== "object" && !Array.isArray(socialLinks)) {
            res.status(422).send({ message: `socialLinks has to be an Array` })
            return
        }
    }

    const fullname = name + ' ' + lastname;

    const user = userModel.create({
        firstName: `${name}`,
        lastName: `${lastname}`,
        fullName: `${fullname}`,
        email: `${email}`,
        password: `${password}`,
        username: `${username}`,
        profileInfo: {
            visibility: visibility || Visibility.PRIVATE,
            profilePicture: profilePicture || '',
            bio: bio || '',
            socialLinks: socialLinks || []
        }
    });

    res.status(201).json({ message: 'User successfully created', id: (await user)._id, email: (await user).email });
}