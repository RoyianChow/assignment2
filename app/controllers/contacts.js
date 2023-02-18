import businessModel from '../models/contacts.js';

import { UserDisplayName } from "../utils/index.js";

//R ead Operations
export function DisplayContactList(req, res, next){
    businessModel.find(function (error, contactCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(contactCollection);

        res.render('index', {title: 'Contact List', 
            page: 'contact/list', 
            contacts: contactCollection,
            displayName: UserDisplayName(req)  })
    })
}


//C reate
export function DisplayContactAddPage(req, res, next){
    res.render('index', {title: 'Add Contact',
     page: 'contact/edit', contact: {},
    displayName: UserDisplayName(req)})
}

export function ProcessContactAddPage(req, res, next){
    let newContact = businessModel({
        name: req.body.name,
        email: req.body.email,       
        company: req.body.company,
        address: req.body.address,   
        number: req.body.number
    });
   
    businessModel.create(newContact,function(error, contact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/contact-list');
    })
}

//U pdate
export function DisplayContactEditPage(req, res, next){

    let id = req.params.id;

    businessModel.findById(id, function(error, contact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.render('index', {title: 'Edit contact', page: 'contact/edit', contact: contact,
        displayName: UserDisplayName(req)})
    })    
}

export function ProcessContactEditPage(req, res, next){
    let id = req.params.id


    let editContact = businessModel({
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,       
        company: req.body.company,
        address: req.body.address,   
        number: req.body.number
    });

    businessModel.updateOne({_id: id}, editContact,function(error, contact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/contact-list');
    })
}


//D elete
export function ProcessContactDelete(req, res, next){
    let id = req.params.id

    businessModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/contact-list');
    })
}