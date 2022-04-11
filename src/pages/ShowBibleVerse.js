import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class EditibleVerse extends Component
{
    state ={
        description : "",
        verses:"",
        error_list: []     
    }

   async componentDidMount(){
        const id = /[^/]*$/.exec(window.location.href)[0];
        console.log(id)
        const res = await axios.get(`http://localhost:8000/api/bibleverse-list/${id}`);
        if(res.status === 200){
            this.setState({
                description: res.data.description,
                verses: res.data.verses
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Show BibleVerse</h4>
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.update}>
                                    <div className='form-group mb-3'>
                                        <label>Verses</label>
                                        <textarea name="description" onChange={this.handeInput} value={this.state.verses} className='form-control' rows="10"></textarea>
                                        <span className='text-danger'>{this.state.error_list.description}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Description</label>
                                        <textarea name="description" onChange={this.handeInput} value={this.state.description} className='form-control' rows="10"></textarea>
                                        <span className='text-danger'>{this.state.error_list.description}</span>
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

export default EditibleVerse;