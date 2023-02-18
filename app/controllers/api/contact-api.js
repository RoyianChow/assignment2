import businessModel from '../../models/contacts.js';

//R ead Operations
export function GetList(req, res, next){
    businessModel.find(function (error, contactCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(contactCollection);
        
        res.json({success: true, msg: 'Success', contacts: contactCollection, user: req.user})       
    })
}

export function Get(req, res, next){
    let id = req.params.id;

    businessModel.findById(id, function (error, contact){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(contact);
        
        res.json({success: true, msg: 'Success', contact: contact, user: req.user})       
    })
}


//C reate
export function Add(req, res, next){
    let newcontact = businessModel({
       ...req.body
    });

    businessModel.create(newcontact,function(error, contact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', newContact: newcontact, user: req.user})
    })
}

//U pdate
export function Edit(req, res, next){
    let id = req.params.id;

    let updatedContacts = new businessModel({
        "_id": id,
        ...req.body
    });

    businessModel.updateOne({ _id: id }, updatedContacts, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.json({ success: true, msg: 'Success', updatedContacts: updatedContacts });
    })
}


//D elete
export function Delete(req, res, next){
    let id = req.params.id

    businessModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Delete Successfull'});
    })
}