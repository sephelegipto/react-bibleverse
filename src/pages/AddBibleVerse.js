import axios from 'axios';
import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
class AddBibleVerse extends Component
{
    state ={
        description : "",   
        error_list: [],     
    }

    handeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    save = async (e) => {
        e.preventDefault();
        let res;
        try {
            res = await axios.post('http://localhost:8000/api/bibleverse-list', this.state);
            if(res.status === 201)
            {
                swal({
                    title: "Success",
                    text: "Added Successfully ",
                    icon: "success",
                    button: "OK"
                })
                this.setState({
                    description: '',
                    error_list: []
                });
            }
        } catch (e) {
            this.setState({
                error_list: e.response.data.errors
            })
        } 
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add BibleVerse</h4>
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.save}>
                                    <div className='form-group mb-3'>
                                        <label>Verses</label>
                                        <textarea name="verses" onChange={this.handeInput} value={this.state.verses} className='form-control' rows="10"></textarea>
                                        <span className='text-danger'>{this.state.error_list.verses}</span>
                                    </div>
                                    
                                    <div className='form-group mb-3'>
                                        <button type="submit" className='btn btn-primary'>Save</button>
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

export default AddBibleVerse;