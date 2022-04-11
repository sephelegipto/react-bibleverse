import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class EditibleVerse extends Component
{
    state ={
        description : "",
        error_list: []     
    }

    handeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    update = async (e) => {
        e.preventDefault();
        const id = /[^/]*$/.exec(window.location.href)[0];
        document.getElementById('updatebtn').disabled = true;
        document.getElementById('updatebtn').innerHTML = "Updating";
        try{
            const res = await axios.put(`http://localhost:8000/api/bibleverse-list/${id}`, this.state);
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
        document.getElementById('updatebtn').disabled = false;
        document.getElementById('updatebtn').innerHTML = "Update";
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
                                <h4>Edit BibleVerse</h4>
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">BACK</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.update}>
                                <div className='form-group mb-3'>
                                        <label>Verses</label>
                                        <textarea name="verses" onChange={this.handeInput} value={this.state.verses} className='form-control' rows="10"></textarea>
                                        <span className='text-danger'>{this.state.error_list.verses}</span>
                                    </div>
                                    
                                    <div className='form-group mb-3'>
                                        <button type="submit" id="updatebtn" className='btn btn-primary'>Update</button>
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