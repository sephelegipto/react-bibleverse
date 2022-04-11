import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class BibleVerse extends Component
{

    state = {
        search: '',
        bibleVerseList: [],
        loading: true,
        sortDesc: 'asc',
        sortVerse: 'asc'
    }

    handeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/bibleverse-list');
        if(res.status == 200){
            
            this.setState({
                bibleVerseList: res.data,
                loading: false,
            })
        }
    }

     delete = async (e,id) => {
        const thidClickedFuna = e.currentTarget;
        thidClickedFuna.innerText = "Deleting";
        const res = await axios.delete(`http://localhost:8000/api/bibleverse-list/${id}`);
        if(res.status == 204){
            thidClickedFuna.closest("tr").remove();
            swal({
                title: "Deleted",
                text: "Deleted Successfully ",
                icon: "success",
                button: "OK"
            })
        }
    }

    search = async (e,id) => {
        const res = await axios.get(`http://localhost:8000/api/bibleverse-list/?search=${this.state.search}&sortDesc=${this.state.sortDesc}&sortVerse=${this.state.sortVerse}`);
        if(res.status == 200){
            
            this.setState({
                bibleVerseList: res.data,
                loading: false,
            })
        }
    }

    searchSortDesc = async (e,id) => {
        if (this.state.sortDesc == 'asc'){
            this.state.sortDesc = 'desc';
        } else {
            this.state.sortDesc = 'asc';
        }
        const res = await axios.get(`http://localhost:8000/api/bibleverse-list/?search=${this.state.search}&sortDesc=${this.state.sortDesc}&sortVerse=${this.state.sortVerse}`);
        if(res.status == 200){
            
            this.setState({
                bibleVerseList: res.data,
                loading: false,
            })
        }
    }

    searchSortVerse = async (e,id) => {
        if (this.state.sortVerse == 'asc'){
            this.state.sortVerse = 'desc';
        } else {
            this.state.sortVerse = 'asc';
        }
        const res = await axios.get(`http://localhost:8000/api/bibleverse-list/?search=${this.state.search}&sortDesc=${this.state.sortDesc}&sortVerse=${this.state.sortVerse}`);
        if(res.status == 200){
            
            this.setState({
                bibleVerseList: res.data,
                loading: false,
            })
        }
    }
 
    render() {

        var bibleVerseList_HTMLTABLE = "";
        if(this.state.loading){
            bibleVerseList_HTMLTABLE = <tr><td col="3"> <h2>Loading..</h2> </td></tr>
        } else {
            bibleVerseList_HTMLTABLE = 
            this.state.bibleVerseList.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.verses}</td>
                        <td>{item.description.substring(0, 20)}</td>                        
                        <td>
                            <Link to={`show-bibleverse/${item.id}`} className="btn btn-success btn-sm">Show</Link>
                        </td>
                        <td>
                            <Link to={`edit-bibleverse/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                        <button type="button" onClick={(e) => this.delete(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>BibleVerse List</h4>
                                <Link to={'add-bibleverse'} className="btn btn-primary btn-sm float-end">Add Bible Verse</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.save}>
                                    
                                    <div className='row pb-4'>
                                        <div className='form-group col-3'>

                                            <input name="search" onChange={this.handeInput} value={this.state.search} className='form-control'></input>
                                            
                                        </div>
                                        <div className='form-group col-3'>
                                            <button type="button" onClick={(e) => this.search(e)} className="btn btn-primary float-start">Search</button>
                                            
                                        </div>
                                    </div>
                                   
                                   
                                </form>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th onClick={(e) => this.searchSortVerse(e)}>Verses</th>
                                            <th onClick={(e) => this.searchSortDesc(e)}>Description</th>                                            
                                            <th>Show</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bibleVerseList_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BibleVerse;