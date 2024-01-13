const express = require('express');
const PORT = 8080;
const app = express();
const bodyParser=require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimiter=require('express-rate-limit');
const axios=require('axios')
// const limiter=rateLimiter({
//     windowMs: 15*60*1000, //15 minutes.
//     max:10   //limits the max number of requests per IP per window.
// })

const setupAndStartServer=()=>{
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use('/authservice',createProxyMiddleware('http://localhost:3001/authservice',{changeOrigin:true}));
        app.use('/flightservice',createProxyMiddleware('http://localhost:3000/flightservice',{changeOrigin:true}));
        app.use('/bookingservice',async(req,res,next)=>{
            try{
                console.log('Hi');
                console.log(req.headers['x_access_token']);
                const response=await axios.default.get('http://localhost:3001/authservice/api/v1/isAuthenticated',
                    {
                        headers:{
                            'x_access_token':req.headers['x_access_token']
                        }
                    }
                );
                if(response.data.success)
                next();
                else{
                    return res.status(404).json({
                    error:"Worngn"
                    })
                }
            }    
            catch(error){
                throw error;
            }
        })
        app.use('/bookingservice',createProxyMiddleware('http://localhost:3002/bookingservice',{changeOrigin:true}));
        app.get('/home',(req,res)=>{
            return res.json({message:"OK"});
        })
        app.listen(PORT,async()=>{
            console.log("Server stared at ",PORT);
        })  
    // app.use(morgan('combined'));
}

setupAndStartServer();