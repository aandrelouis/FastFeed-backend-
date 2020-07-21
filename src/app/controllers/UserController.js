import User from '../models/User';
import * as Yup from 'yup';


class UserController {
    async store(req,res){
        const schema = Yup.object().shape({
            email:Yup.string().email().required(),
            password:Yup.string().required().min(6),
            name:Yup.string().required(),
        });
        
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:"Validation Fails"})
        }
        const user  = await User.findOne({where : {email : req.body.email}});

        if(user){
            return res.status(401).json({ error : 'Email was already register '})
        }

        const response = await User.create(req.body);


        return res.json({response});
    }
}

export default new UserController();