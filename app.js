const express = require("express");
const app = express();
const PORT = 5000;
const bodyParser=require("body-parser");
const https=require("https");
// const mailchimp = require("mailchimp");
app.use(bodyParser.urlencoded({extends: true}));

app.use(express.static('public'));

//Main HTML
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
//--Port listen--
app.listen(PORT, (err)=> {
    if(err) {
        return err;
    }
    console.log("Server is running");
});


//NewLetter Part-- With Mailchimp API
app.post("/add-newsletter",(req, res) => {
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const mailchimp = require("@mailchimp/mailchimp_marketing");
    mailchimp.setConfig({
        apiKey: "684c4f13758fc5b3c8e5440677c3f388-us18",
        server: "us18",
      });
      const listId = "86c8cdc9d0";
      const subscribingUser = {
        firstName: "Prudence",
        lastName: "McVankab",
        email: email
      };
      
      async function run() {
        try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
          }
        })
        res.sendFile(__dirname+"/success.html");
    }
    catch (error) {
        res.sendFile(__dirname+"/failure.html");
        console.log(error.message);
    }
}
      run();
});