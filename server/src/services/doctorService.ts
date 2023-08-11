import doctorModel from "../models/doctor";
import { NewDoctor } from "../types";
import bcrypt from 'bcrypt';

const addDoctor = async ( doctor: NewDoctor ) => {
    const { username, password, name } = doctor;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newDoctor = new doctorModel({
        username,
        password: passwordHash,
        name,
    });

    const savedDoctor = await newDoctor.save();
    return savedDoctor;
};

export default { addDoctor };