const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/',function(request,response){
    Contact.find({},function(error,contacts){
        if(error){
            console.log('Error in fetching contacts');
            return;
        }
        response.render('home',{
            title: 'Contacts List',
            contacts: contacts
        });
    });
});

app.post('/create-contact',function(request,response){
    Contact.create(request.body, function(error,new_contact){
        if(error){
            console.log('Error in creating contact');
            return;
        }
        console.log(new_contact);
        response.redirect('/');
    });
});

app.get('/delete-contact',function(request,response){
    const id = request.query.id;
    Contact.findByIdAndDelete(id, function(error){
        if(error){
            console.log('Error in deleting the contact');
            return;
        }
        response.redirect('back');
    });
});

app.listen(port,function(error){
    if(error){
        console.log(error);
    }
    console.log('Server is up and running');
});