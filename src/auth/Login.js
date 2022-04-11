import axios from 'axios';
import React, {Component} from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

class Login extends Component{
    

    state ={
        email : "",
        password : "",
        error_list: []     
    }

    handeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = async (e) => {
        e.preventDefault();


        document.getElementById('loginbtn').disabled = true;
        document.getElementById('loginbtn').innerHTML = "Checking";
        try{
            const res = await axios.post(`http://localhost:8000/api/login`, this.state);
            if(res.status === 200)
            {
                swal({
                    title: "Success",
                    text: "Updated Successfully ",
                    icon: "success",
                    button: "OK"
                })
            }
        }catch (err) {
            this.setState({
                error_list: err.response.data.errors
            })
        } 
        document.getElementById('loginbtn').disabled = false;
        document.getElementById('loginbtn').innerHTML = "Login";
    }

    render() {
        return (
        <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.login}>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type="email" name="email" onChange={this.handeInput} value={this.state.email} className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={this.handeInput} value={this.state.password} className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type="submit" id="loginbtn" className='btn btn-primary'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
}
export default Login;