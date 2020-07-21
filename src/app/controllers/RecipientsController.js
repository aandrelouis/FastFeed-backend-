import Recipient from '../models/Recipient';
import * as Yup from 'yup';

class RecipientsController{
    async index(rqe,res){
        const recipients =await Recipient.findAll();

        return res.json(recipients);
    }
    
    async store(req,res){
        const schema = Yup.object().shape({
            name:Yup.string().required(),
            city:Yup.string().required(),
            cep:Yup.string().required(),
            street:Yup.string().required(),
            complement:Yup.string().required(),
            number:Yup.string().required(),
            uf:Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validation Fails'})
        }

        const response = await Recipient.create(req.body);

        return res.json({response});
    }

    async update(req,res){
        const {id} = req.params;

        const recipient = await Recipient.findByPk(id);
        

        const response = await recipient.update(req.body);
    
    
        return res.json(response);
    }

    async delete(req,res){
        const {id} = req.params;

        const recipient = await Recipient.findByPk(id);

        if(!recipient){
            return res.status(401).json({error:'Recipient not Found'});
        }
        await recipient.destroy();

        return res.json('Recipient Deleted');
    }
}


export default new RecipientsController();